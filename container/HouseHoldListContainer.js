import React, { Component } from "react";
import {Text, View} from "react-native";
import firebaseDb from "../firebaseDb";

export default class HouseHoldListContainer extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>HoueHold List</Text>
            </View>
        )
    }
}