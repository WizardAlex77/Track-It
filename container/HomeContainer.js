import React, {Component} from 'react';
import { StyleSheet, View, TextInput, Text, Button} from 'react-native';
import firebaseDb from "../firebaseDb";

export default class Home extends Component {
    user = firebaseDb.auth().currentUser;
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{this.user.displayName}</Text>
            </View>
        );
    }
}

