import React, { Component, useState } from "react";
import { TextInput, Text, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Ionicons from "react-native-vector-icons/Ionicons";

const DatePicker = props => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
        props.clear();
    };

    const handleConfirm = (date) => {
        console.log("A date has been picked: ", date);
        props.onChange(date);
        setDatePickerVisibility(false);
    };


    return (
        <View style={props.style}>
            <Text style={styles.inputTitle}>Expiry Date (Optional)</Text>
            <TouchableOpacity testID={'press'} style={styles.input} onPress={showDatePicker} >
                <Text testID={'date'} style={[styles.input, { marginTop: 10 }]}>{(props.date ? (new Date(props.date)).toDateString() : "")}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
                testID={'picker'}
                isVisible={isDatePickerVisible}
                mode="date"
                cancelTextIOS="Clear"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    )
}

export default DatePicker


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