import React, {Component} from 'react';
import {StyleSheet, View, Alert, Text, ActivityIndicator, FlatList, Image } from 'react-native';
import firebaseDb from "../firebaseDb";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "../component/Button";

export default class Home extends Component {
    state = {
        Username: "not done",
        isLoading: true,
        items: null,
    }

    componentDidMount() {
        firebaseDb.firestore().collection('items')
            .where("owner", "==", firebaseDb.auth().currentUser.displayName)
            .get()
            .then((querySnapshot) => {
                const results = [];
                querySnapshot.docs.map((documentSnapshot) =>
                    results.push(documentSnapshot.data())
                );
                this.setState({isLoading: false, items: results, Username: firebaseDb.auth().currentUser.displayName});
                console.log('loaded ' + this.state.Username);
            }).catch(err => console.error(err));
    }

    renderItem = (item) => {
        return (
            <View style={styles.feedItem}>
                 <Image source={require("../assets/logo.png")} style={styles.avatar}/>
                 <View style={{flex: 1}}>
                     <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                         <View>
                             <Text style={styles.name}>{item.name}</Text>
                             <Text style={styles.locationStamp}> <Text>Location: </Text> {item.location}</Text>
                         </View>

                         <Icon name="ios-more" size={24} color="#73788B" />
                     </View>
                 </View>
            </View>
        )
    }

    render() {
        const { items, isLoading } = this.state;
        if (isLoading) {
            return <ActivityIndicator />;
        }
        else {
            return (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>All Items</Text>
                    </View>

                    <FlatList
                        style={styles.feed}
                        data={items}
                        renderItem={({ item }) => this.renderItem(item)}
                        keyExtractor={item=>item.name} />
                </View>
            )
                  /*  <View style={styles.container}>
                    <Text style={{ fontSize: 35, padding: "5%", fontWeight: "bold" }}>
                        Welcome
                        <Text> {this.state.Username}</Text>
                        !</Text>
                    <FlatList style={{alignSelf: 'center'}}
                        data={items}
                        renderItem={({ item }) => (
                            <Button
                                style={{width: 250, marginVertical: 10, alignSelf: 'center', backgroundColor: 'red', opacity: 0.3}}
                                onPress={() => {
                                    Keyboard.dismiss();
                                    Alert.alert(item.name, "Location: "  + item.location);
                                }}
                            >
                                <Text>{item.name}</Text>
                            </Button>
                        )}
                        keyExtractor={item => item.email}
                    />
                    </View>; */
        }

           // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          //      <Text>{Username}</Text>
           // </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EFECF4",
    },
    header: {
        paddingTop: 30,
        paddingBottom: 16,
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#454D65",
        shadowOffset: {height: 5},
        shadowRadius: 15,
        shadowOpacity: 0.2,
        zIndex: 10
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "500"
    },
    feed: {
        marginHorizontal: 16
    },
    feedItem: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 8,
        flexDirection: "row",
        marginVertical: 8
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16
    },
    name: {
        fontSize: 15,
        fontWeight: "500",
        color: "#454D65"
    },
    locationStamp: {
        fontSize: 11,
        color: "#C4C6CE",
        marginTop: 4
    }
})

