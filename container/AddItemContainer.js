import React, { Component } from "react";
import {View, Text, StyleSheet, Keyboard} from 'react-native';
import Button from "../component/Button";

export default class AddItemContainer extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.greeting}>Add an Item!</Text>
                <View style={styles.form}>
                    <Button
                        style={styles.button}
                        onPress={() => {
                            Keyboard.dismiss();
                            this.props.navigation.navigate("Add Item to Inventory");
                        }}
                    >
                        <Text>Add to Inventory</Text>
                    </Button>
                    <Button
                        style={styles.button}
                        onPress={() => {
                            Keyboard.dismiss();
                            this.props.navigation.navigate("Add Item to WishList");
                        }}
                    >
                        <Text>Add to Wishlist</Text>
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
        marginTop: "30%",
        fontSize: 40,
        fontWeight: "bold",
        textAlign: 'center',
        marginBottom: 60
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30
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
        height: 100,
        alignItems: "center",
        justifyContent: "center"
    },
})
/*
const styles = StyleSheet.create({
    header: {
        marginBottom: 60
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    validationText: {
        marginTop: 8,
        marginBottom: 16,
        color: 'red',
        alignSelf: 'center'
    },
    formInput: {
        width: 300,
        height: 50,
        borderColor: '#B5B4BC',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8
    },
    loginButton: {
        width: 200,
        marginBottom: 16,
        backgroundColor: '#6f37be',
    },
    switchButton: {
        width: 200,
        backgroundColor: '#3f51b5'
    }
});
*/

