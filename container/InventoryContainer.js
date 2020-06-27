import React, { Component } from "react";
import {ActivityIndicator, FlatList, StyleSheet, Text, View, Image, TouchableOpacity, Alert} from "react-native";
import firebaseDb from "../firebaseDb";
import Icon from "react-native-vector-icons/Ionicons";

export default class InventoryContainer extends Component {
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

    renderOwnItem = (item) => {
        return (
            <View style={styles.feedItem}>
                <Image source={require("../assets/logo.png")} style={styles.avatar}/>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <View>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.locationStamp}> <Text>Location: </Text> {item.location}</Text>
                        </View>
                        <TouchableOpacity onPress={() => Alert.alert(item.name,"Owner: " + item.owner + "\nQuantity: " + item.quantity)}>
                            <Icon name="ios-more" size={24} color="#73788B" />
                        </TouchableOpacity>
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
                        <Text style={styles.headerTitle}>Your Items</Text>
                    </View>

                    <FlatList
                        style={styles.feed}
                        data={items}
                        renderItem={({ item }) => this.renderOwnItem(item)}
                        keyExtractor={item=>item.name} />
                </View>
            )
        }
    }
}

    /*   componentDidMount() {
        const {imageName} = this.state;
     let imageRef = firebaseDb.firestore().collection('users')
            .doc('12LsTRqNugb7h7BczYXX')
            .collection('Items')
            .ref('/' + imageName);
        imageRef.getDownloadURL()
            .then((url) => {
                //from url you can fetched the uploaded image easily
                this.setState({profileImageUrl: url});
            })
            .catch((e) => console.log('getting downloadURL of image error => ', e));*/
    /*    firebaseDb.firestore().collection('users')
            .doc('12LsTRqNugb7h7BczYXX')
            .collection('Items')
            .get()
            .then((querySnapshot) => {
                const results = [];
                querySnapshot.docs.map((documentSnapshot) =>
                    results.push(documentSnapshot.data())
                );
                this.setState({isLoading: false, users: results});
            }).catch(err => console.error(err));
    }

    constant ref = firebase.storage().ref('path/to/image.jpg');
    constant url = await ref.getDownloadURL();

    render() {
        const { isLoading, users } = this.state;
        if (isLoading) {
            return <ActivityIndicator />;
        }
        else {
            return <FlatList
                data={users}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <Text>{item.Name}</Text>
                        <Text>{item.Description}</Text>
                        <Image
                            source={{ uri: url }}
                        />
                    </View>
                )}
                keyExtractor={item => item.email}
            />;
        }
    }
}
*/

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