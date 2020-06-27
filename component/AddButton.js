import React, { Component } from "react";
import {View, Text, StyleSheet, Keyboard} from 'react-native';
import TextBox from "./TextBox";
import Button from "./Button";
import firebaseDb from "../firebaseDb";

export default class AddButton extends Component {
    state = {
        name: "",
        type: "",
        location:"",
        quantity:"",
        description:""
    };

    handleUpdateName = (name) => this.setState({ name });
    handleUpdateType = (type) => this.setState({ type });
    handleUpdateLocation = (location) => this.setState({ location });
    handleUpdateQuantity = (quantity) => this.setState({ quantity });
    handleUpdateDescription = (description) => this.setState({ description });
    handleAddItem = () => firebaseDb
        .firestore()
        .collection('items')
        .add({
            name: this.state.name,
            type: this.state.type,
            location: this.state.location,
            quantity: this.state.quantity,
            description: this.state.description,
            owner: firebaseDb.auth().currentUser.displayName,
        })
        .then(() => {
            this.setState({
                name: "",
                type: "",
                location:"",
                quantity:"",
                description:""
            });
            this.props.navigation.navigate("Home");
        })
        .catch((err) => console.error(err));

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 35, padding: "5%", fontWeight: "bold" }}>Add an item!</Text>
                <View>
                <TextBox
                    label="Name"
                    style={styles.formInput}
                    onChange={this.handleUpdateName}
                    value={this.state.name}
                    returnKeyType="next"
                />
                <TextBox
                        label="Type"
                        style={styles.formInput}
                        onChange={this.handleUpdateType}
                        value={this.state.type}
                        returnKeyType="next"
                />
                <TextBox
                        label="Quantity"
                        style={styles.formInput}
                        onChange={this.handleUpdateQuantity}
                        value={this.state.quantity}
                        returnKeyType="next"
                />
                    <TextBox
                        label="Location"
                        style={styles.formInput}
                        onChange={this.handleUpdateLocation}
                        value={this.state.location}
                        returnKeyType="next"
                    />
                    <TextBox
                        label="Description"
                        style={styles.formInput}
                        onChange={this.handleUpdateDescription}
                        value={this.state.description}
                        returnKeyType="next"
                    />
                    <Button
                        style={[styles.buttonContainer, {width: 250, marginVertical: 10, alignSelf: 'center'}]}
                        onPress={() => {
                            Keyboard.dismiss();
                            this.handleAddItem();
                        }}
                    >
                        <Text>Add Item</Text>
                    </Button>
                </View>
            </View>
        )
    }
}

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
