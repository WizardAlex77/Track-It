import React, { Component } from "react";
import {Text, View, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator} from "react-native";
import firebaseDb from "../firebaseDb";
import Button from "../component/Button";
import { connect } from 'react-redux';
import {watchItemData, watchItemExpiry, watchRequests, watchUsers, watchMemberListDisplay} from '../app-redux';
import Icon from "react-native-vector-icons/Ionicons";

const mapStateToProps = (state) => {
    return {
        items: state.items,
        requests: state.requests
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        watchItemData: () => dispatch(watchItemData()),
        watchItemExpiry: () => dispatch(watchItemExpiry()),
        watchRequests: () => dispatch(watchRequests()),
        watchUsers: () => dispatch(watchUsers()),
        watchMemberListDisplay: () => dispatch(watchMemberListDisplay())
    };
}

class householdSettingsContainer extends Component {

    state = {
        currentUsername: '',
        currentUserEmail: '',
        currentHousehold: '',
        currentHouseholdEmail: '',
        isLoading: true
    }

    componentDidMount() {
        this.props.watchRequests();
        this.props.watchUsers();
        console.log("mounted hh settings");
        let currentUserName = firebaseDb.auth().currentUser.displayName;
        let currentUserEmail = firebaseDb.auth().currentUser.email;
        firebaseDb.firestore().collection('users').doc(currentUserEmail).get().then(
            doc => {
                this.setState({currentHousehold: doc.get("householdName")});
                this.setState({currentHouseholdEmail: doc.get("household")});
                this.setState({currentUsername: currentUserName})
                this.setState({currentUserEmail: currentUserEmail})
                this.setState({isLoading: false});
            }
        )
    }

    handleViewMembers = () => {
        this.props.navigation.navigate("memberList");
    }

    handleViewRequest = () => {
        if (this.state.currentUserEmail === this.state.currentHouseholdEmail) {
            this.props.navigation.navigate("requests")
        } else {
            Alert.alert("You are not the owner of this house", "You can only accept requests for your own household")
        }
    }

    handleJoinOther = () => {
        if (this.state.currentUserEmail === this.state.currentHouseholdEmail) {
            this.props.navigation.navigate("JoinOther")
        } else {
            Alert.alert("You are already in another household", "You can only join another household from your own household")
        }
    }

    handleLeave = () => {
        if (this.state.currentUserEmail === this.state.currentHouseholdEmail) {
            Alert.alert("You cannot leave your own household", "Abandonment is not accepted")
        } else {
            Alert.alert(
                'Confirm Leaving Household',
                'If you leave this household, you will be placed back in your own household and all your items will be removed and you will have to request to join again',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: 'Confirm', onPress: () => {
                            console.log('OK Pressed');
                            this.setState({isLoading: true});
                            let newEmail = firebaseDb.auth().currentUser.email;
                            firebaseDb.auth().currentUser.updateProfile({photoURL: newEmail}).then(() => {
                                firebaseDb.firestore().collection('users').doc(this.state.currentUserEmail)
                                    .set({ household: this.state.currentUserEmail, householdName: this.state.currentUsername }, { merge: true }).then(() => {
                                    let db = firebaseDb.firestore()
                                    db.collection('items').doc(this.state.currentHouseholdEmail).collection('items')
                                        .where("ownerEmail", "==", this.state.currentUserEmail)
                                        .get()
                                        .then((querySnapshot) => {
                                            let batch = firebaseDb.firestore().batch();
                                            querySnapshot.docs.forEach((data) => {
                                                batch.delete(data.ref)
                                            });
                                            return batch.commit().then(() => {
                                                this.props.watchItemData();
                                                this.props.watchItemExpiry();
                                                Alert.alert("Left Successfully", "You are back in your own household")
                                            });
                                            }).catch(err => console.log(err));
                                    this.props.navigation.goBack();
                                    })
                                })
                            }
                    },
                ]
            );
        }
    }

    render() {
        const {isLoading, currentUser, currentHousehold, currentUserEmail, currentHouseholdEmail} = this.state;
        if (isLoading) {
            return <ActivityIndicator/>;
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
                            style={{ fontSize: 40, padding: "5%", fontWeight: "bold" }}
                        >
                            Current Household
                        </Text>
                        <Text  style={{ fontWeight: "bold" }}>{currentUserEmail === currentHouseholdEmail ? "You are in your own house!": "You are currently in " + currentHousehold + "'s house!"}</Text>
                    </View>

                    <View style={styles.form}>
                        <Button
                            onPress={this.handleViewMembers}
                            style={styles.button}
                        >
                            <Text>View HouseHold Members</Text>
                        </Button>

                        <Button
                            onPress={this.handleJoinOther}
                            style={styles.button}
                        >
                            <Text>Join Another Household</Text>
                        </Button>

                        <Button
                            onPress={this.handleViewRequest}
                            style={styles.button}
                        >
                            <Text>View Requests</Text>
                            {this.props.requests.length > 0  && <Icon name="ios-alert" color={"#ee1515"} size={20} />}
                        </Button>

                        <Button
                            onPress={this.handleLeave}
                            style={styles.button}
                        >
                            <Text>Leave Household</Text>
                        </Button>
                    </View>
                </View>
            )
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(householdSettingsContainer);

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
    form: {
        marginBottom: 48,
        marginHorizontal: 30,
        marginTop: "75%"
    },
    button: {
        marginHorizontal: 20,
        backgroundColor: "#70bee2",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },
    background1: {
        position: 'absolute',
        width: 350,
        height: 500,
        top: -100,
        left: -10,
        resizeMode: "contain",
    },
    background2: {
        position: 'absolute',
        width: 350,
        height: 500,
        top: -100,
        left: -30,
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