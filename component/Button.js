import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

const Button = props => (
    <TouchableOpacity style={[styles.container, props.style]} onPress={props.onPress}>
        <Text style={styles.buttonText}>{props.children}</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2980b9',
        paddingVertical: 15,
        marginBottom: 10,
        borderRadius: 15
    },
    buttonText: {
        textAlign: 'center',
        color: 'rgb(108,108,108)',
        fontWeight: '700'
    }
});

export default Button