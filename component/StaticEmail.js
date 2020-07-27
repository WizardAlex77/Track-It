import React, { Component, useState } from "react";
import { TextInput, Text, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Ionicons from "react-native-vector-icons/Ionicons";

const StaticEmailInput = props => (
    <View style={props.style} testID={'wrapper'}>
        <Text style={styles.inputTitle} testID={'text'}>{props.children}</Text>
        <TextInput style={styles.input} testID={'input'} autoCapitalize="none" keyboardType="email-address" onChangeText={props.onChangeText} value={props.value} />
    </View>
)

export default StaticEmailInput;

const styles = StyleSheet.create({
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161f3d"
    },
    input2: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'rgb(121,130,167)',
        backgroundColor: "rgba(252,241,241,0.43)",
        textAlign: 'center',
        height: 40,
        fontSize: 15,
        color: "#161f3d"
    },
})