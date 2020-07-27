import React, { Component } from "react";
import {Text, View, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator, FlatList } from "react-native";
import firebaseDb from "../firebaseDb";
import { connect } from 'react-redux';
import {watchUsers, watchItemExpiry, watchItemData, watchMemberListDisplay} from '../app-redux';
import {Icon} from "native-base";

const mapStateToProps = (state) => {
    return {
        users: state.users,
        memberListDisplay: state.memberListDisplay
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        watchUsers: () => dispatch(watchUsers()),
        watchItemExpiry: () => dispatch(watchItemExpiry()),
        watchItemData: () => dispatch(watchItemData()),
        watchMemberListDisplay: () => dispatch(watchMemberListDisplay())
    };
}

class memberListContainer extends Component {

    state = {
        owner: false,
        loading: true,
    }

    componentDidMount() {
        console.log("mounting memberList")
        this.props.watchUsers();
        if (firebaseDb.auth().currentUser.email === firebaseDb.auth().currentUser.photoURL) {
            this.setState({owner: true})
            this.props.watchMemberListDisplay(true);
        } else {
            this.props.watchMemberListDisplay(false);
        }

        this.setState({loading: false})
    }

    updateList = () => {
        console.log("updating member list after removal")
        this.props.watchMemberListDisplay(this.state.owner);
    }

    renderOwnItem = (item) => {
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
                        {this.state.owner &&
                        <TouchableOpacity
                            onPress={() => {
                                Alert.alert(
                                    'Confirm Remove Member',
                                    'If you remove this member, all his/her items will be deleted and he/she will have to request to join again',
                                    [
                                        {
                                            text: 'Cancel',
                                            onPress: () => console.log('Cancel Pressed'),
                                            style: 'cancel',
                                        },
                                        {
                                            text: 'Confirm', onPress: () => {
                                                console.log('OK Pressed');
                                                firebaseDb.firestore().collection('users').doc(item.email).set({
                                                    household: item.email,
                                                    householdName: item.name,
                                                    status: 'removed'
                                                }, {merge: true})
                                                    .then(() => {
                                                        let db = firebaseDb.firestore()
                                                        db.collection('items').doc(firebaseDb.auth().currentUser.email).collection('items')
                                                            .where("ownerEmail", "==", item.email)
                                                            .get()
                                                            .then((querySnapshot) => {
                                                                let batch = firebaseDb.firestore().batch();
                                                                querySnapshot.docs.forEach((data) => {
                                                                    batch.delete(data.ref)
                                                                });
                                                                return batch.commit().then(() => {
                                                                    this.props.watchUsers();
                                                                    this.props.watchItemData();
                                                                    this.props.watchItemExpiry();
                                                                    this.updateList();
                                                                    Alert.alert("Removed Successfully",item.name + " will be informed the next time he/she logs in")
                                                                });
                                                            }).catch(err => console.log(err));
                                                    })
                                            }
                                        }
                                    ]
                                );
                            }}
                        >
                            <Text>Remove</Text>
                        </TouchableOpacity>}
                    </View>
                </View>
            </View>
        );
    };


    render() {
        const { loading} = this.state;
        if (loading) {
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
                        Household Members
                    </Text>
                    <Text>People who live with you</Text>
                </View>

                {this.props.memberListDisplay.length === 0 && <Text style={{alignSelf: 'center', top: 250, color: "rgba(0,0,0,0.28)"}}>There are no other house members</Text>}

                <View style={{marginTop: "70%"}}>
                    <FlatList
                        style={styles.feed}
                        data={this.props.memberListDisplay}
                        renderItem={({ item }) => this.renderOwnItem(item)}
                        keyExtractor={(item) => item.email}
                        //ListHeaderComponent={this.renderHeader}
                    />
                </View>
            </View>
            )}

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(memberListContainer);

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