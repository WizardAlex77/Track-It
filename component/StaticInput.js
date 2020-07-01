import React, { Component } from "react";
import { TextInput, Text, StyleSheet, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';



export const StaticInput = props => (
    <View style={props.style}>
        <Text style={styles.inputTitle}>{props.children}</Text>
        <TextInput style={styles.input} autoCapitalize="none" onChangeText={props.onChangeText} value={props.value} />
    </View>
)

export const StaticPasswordInput = props => (
    <View style={props.style}>
        <Text style={styles.inputTitle}>{props.children}</Text>
        <TextInput style={styles.input} autoCapitalize="none" secureTextEntry onChangeText={props.onChangeText} value={props.value} />
    </View>
)

export const StaticEmailInput = props => (
    <View style={props.style}>
        <Text style={styles.inputTitle}>{props.children}</Text>
        <TextInput style={styles.input} autoCapitalize="none" keyboardType="email-address" onChangeText={props.onChangeText} value={props.value} />
    </View>
)

export const FieldInput = props => (
    <View style={props.style}>
        <Text style={styles.inputTitle}>{props.children}</Text>
        <TextInput style={styles.input} onChangeText={props.onChangeText} value={props.value} />
    </View>
)

export const DatePicker = props => (
    <View style={props.style}>
        <DateTimePicker
            style={styles.input}
            value={props.value}
            mode="date"
            display="default"
            onChange={props.onChange}
            placeholder="select date"
        />
    </View>
)


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
    }
})
