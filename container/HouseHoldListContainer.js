import React, { Component } from "react";
import {Text, View, StyleSheet} from "react-native";
import firebaseDb from "../firebaseDb";
import Button from "../component/Button";

export default class HouseHoldListContainer extends Component {
    handleSignOut = () => {
        firebaseDb.auth().signOut().then( () =>
            console.log("signed out")
        );
        this.props.navigation.navigate('Log In')
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button
                    onPress={this.handleSignOut}
                    style={[styles.buttonContainer, {width: 250, marginVertical: 10, alignSelf: 'center'}]}
                >
                    <Text>Sign Out</Text>
                </Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
    backgroundColor: "#2980b9",
        paddingVertical: 16,
        marginBottom: 8,
        marginTop: 8,
}}
)