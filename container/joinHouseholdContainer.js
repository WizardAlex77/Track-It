import React, { Component } from "react";
import firebaseDb from "../firebaseDb";
import Button from "../component/Button";
import { StaticInput2 } from "../component/StaticInput";
import {Image, Keyboard, Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Icon} from "native-base";

export default class joinHouseholdContainer extends Component {

    state = {
        currentUser: '',
        userInput: ''
    }

    componentDidMount() {
        this.setState({currentUser: firebaseDb.auth().currentUser.email})
    }

    handleUpdateInput = (userInput) => this.setState({ userInput });
    handleRequest = () => {
       firebaseDb.firestore().collection('requests').doc(this.state.currentUser).set(
           {
           currentUser: this.state.currentUser,
               toJoin: this.state.userInput
       }).then(() => {
           Alert.alert("Request successful!", "If accepted, the change will be reflected the next time you log in")
           this.props.navigation.goBack();
       })
    }

    render() {
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
                        Join Household!
                    </Text>
                    <Text>Input another user's email below to request</Text>
                </View>

                <View style={styles.form}>
                    <StaticInput2 style={{marginTop: 32}} onChangeText={this.handleUpdateInput} value={this.state.userInput}></StaticInput2>

                    <Button
                        style={styles.button}
                        onPress={() => {
                            Keyboard.dismiss();
                            if (!this.state.userInput.includes("@") || !this.state.userInput) {
                                Alert.alert("Invalid Email Address", "Please enter a valid Email Address")
                            } else {
                                this.handleRequest();
                            }
                        }}
                    >
                        <Text>Request To Join</Text>
                    </Button>

                </View>
            </View>
        )
    }

}

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
        marginTop: "50%"
    },
    logo: {
        marginTop: "20%",
        width: 270,
        height: 110,
        resizeMode: "contain",
        alignSelf: 'center'
    },
    input: {
        marginHorizontal: 30,
        marginLeft: 30,
        height: 75,
        fontSize: 15,
        color: "#161f3d",
        marginTop: 14
    },
    button: {
        marginHorizontal: 30,
        marginTop: 30,
        backgroundColor: "#70bee2",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
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
})