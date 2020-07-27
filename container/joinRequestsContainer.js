import React, { Component } from "react";
import firebaseDb from "../firebaseDb";
import Button from "../component/Button";
import {
    Image,
    Keyboard,
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
    FlatList
} from "react-native";
import {Icon} from "native-base";
import { connect } from 'react-redux';
import {watchUsers, watchRequests} from '../app-redux';

const firebase = require("firebase");
require("firebase/firestore");

const mapStateToProps = (state) => {
    return {
        users: state.users,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        watchUsers: () => dispatch(watchUsers()),
        watchRequests: () => dispatch(watchRequests()),
    };
}

class joinRequestsContainer extends Component {
    state = {
        requestList: null,
        isLoading: true,
    }

    componentDidMount() {
        this.props.watchUsers();
        const currentEmail = firebaseDb.auth().currentUser.email;
        firebaseDb.firestore().collection('requests')
            .where("toJoin", "==", currentEmail)
            .get()
            .then((querySnapshot) => {
            const results = [];
            querySnapshot.docs.map((documentSnapshot) =>
                results.push(documentSnapshot.data())
            );
            this.setState({requestList: results, isLoading: false});
            })
            .catch(err => console.log(err));
    }

    renderOwnItem = (items) => {
        function isUser(element, index, array) {
            return (element.email === items.currentUser);
        }

        const item = this.props.users.find(isUser);
        //console.log(item.avatar)

        return (
            <View style={styles.feedItem}>
                <Image source={item.avatar ? { uri: item.avatar } : require("../assets/dummy-avatar.jpg") } style={styles.avatar} />
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <View>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.locationStamp}>
                                {""}
                                <Text>Email: </Text>{item.email}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                const currentEmail = firebaseDb.auth().currentUser.email;
                                const currentName = firebaseDb.auth().currentUser.displayName;
                                //const index = this.state.requestList.indexOf(items);
                                //let newRequestList = [];
                                //if (index > -1) {
                                 //   newRequestList = this.state.requestList.splice(index, 1);
                               // }
                               // this.setState({requestList: newRequestList});
                                firebaseDb.firestore().collection('users')
                                    .doc(item.email)
                                    .set({ household: currentEmail, householdName: currentName, status: 'justJoined'}, { merge: true })
                                    .then(() => firebaseDb.firestore().collection('requests').doc(items.currentUser).delete().then(
                                        () => {
                                            firebaseDb.firestore().collection('requests')
                                                .where("toJoin", "==", currentEmail)
                                                .get()
                                                .then((querySnapshot) => {
                                                    const results = [];
                                                    querySnapshot.docs.map((documentSnapshot) =>
                                                        results.push(documentSnapshot.data())
                                                    );
                                                    this.setState({requestList: results});
                                                    this.props.watchRequests();
                                                    this.props.watchUsers();
                                                    console.log("request done");
                                                    Alert.alert("Request Approved", item.name + " is now part of your household");
                                                })
                                                .catch(err => console.log(err));
                                        }
                                    )).catch(err => console.log(err))

                            }
                            }
                        >
                            <Text>Approve</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    render() {
        const { isLoading, requestList } = this.state;
        if (isLoading) {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 70
                }}>
                    <ActivityIndicator />
                </View>
            )
        } else {
            return (
                <View style={styles.container}>

                    <Image
                        style={styles.background1}
                        source={require("../assets/settingBackground2.png")}
                    />
                    <Image
                        style={styles.background2}
                        source={require("../assets/settingBackground1.png")}
                    />

                    <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                        <Icon name="ios-arrow-round-back" size={32} color="#FFF" />
                    </TouchableOpacity>

                    <View style={styles.greeting}>
                        <Text
                            style={{ fontSize: 35, padding: "5%", fontWeight: "bold" }}
                        >
                            Requests for you!
                        </Text>
                        <Text>These people want to join your household</Text>
                    </View>

                    {requestList.length == 0 && <Text style={{alignSelf: 'center', top: 250, color: "rgba(0,0,0,0.28)"}}>There are currently no requests</Text>}

                    <View style={{marginTop: "60%"}}>
                        <FlatList
                            style={styles.feed}
                            data={requestList}
                            renderItem={({ item }) => this.renderOwnItem(item)}
                            keyExtractor={(item) => item.currentUser}
                            //ListHeaderComponent={this.renderHeader}
                        />
                    </View>
                </View>

            )
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(joinRequestsContainer);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    greeting: {
        position: 'absolute',
        top: 70,
        alignItems: 'center',
        width: "100%"
    },
    feed: {
        marginHorizontal: 16,
    },
    feedItem: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 8,
        flexDirection: "row",
        marginTop: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 18,
        marginRight: 14,
    },
    name: {
        fontSize: 17,
        fontWeight: "500",
        color: "#454D65",
    },
    locationStamp: {
        fontSize: 13,
        color: "#C4C6CE",
        marginTop: 4,
    },
    background1: {
        position: 'absolute',
        width: "100%",
        height: "100%",
        top: -150,
        resizeMode: "contain",
    },
    background2: {
        position: 'absolute',
        width: "100%",
        height: "100%",
        top: -150,
        resizeMode: "contain",
    },
    back: {
        position: "absolute",
        top: 30,
        left: 17,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "rgba(21,22,48,0.1)",
        alignItems: 'center',
        justifyContent: 'center'
    },
});