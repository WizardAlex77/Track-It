import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import firebaseDb from "../firebaseDb";
import Button from "../component/Button";

export default class SettingsContainer extends Component {
    handleSignOut = () => {
        firebaseDb.auth().signOut().then( () =>
            console.log("signed out")
        );
        this.props.navigation.navigate('Log In')
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ position: 'absolute', top: 61, alignItems: 'center', width: "100%" }}>
                    <Image style={styles.avatar} source={require("../assets/random_avatar.png")} />
                </View>
                <View style={styles.form}>
                    <Button
                        onPress={this.handleSignOut}
                        style={styles.button}
                    >
                        <Text>Edit Profile</Text>
                    </Button>
                    <Button
                        onPress={this.handleSignOut}
                        style={styles.button}
                    >
                        <Text>Sign Out</Text>
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
        marginTop: 32,
        fontSize: 18,
        fontWeight: "400",
        textAlign: 'center'
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30,
        marginTop: "100%"
    },
    logo: {
        marginTop: "20%",
        width: 270,
        height: 110,
        resizeMode: "contain",
        alignSelf: 'center'
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#E1E2E6",
        marginTop: 48,
        justifyContent: 'center',
        alignItems: 'center'
    }
})