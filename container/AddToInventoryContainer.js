import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Text,
    Keyboard, ScrollView, SafeAreaView, TouchableOpacity, KeyboardAvoidingView,
} from "react-native";
import firebaseDb from "../firebaseDb";
import TextBox from "../component/TextBox";
import Button from "../component/Button";
import {FieldInput} from "../component/StaticInput";
import {Icon} from "native-base";

export default class AddToInventoryContainer extends Component {
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
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                            <Icon name="ios-arrow-round-back" size={32} color="#FFF" />
                        </TouchableOpacity>
                        <View style={{marginTop: 20}}>
                        <Text style={styles.greeting}>Add an Item!</Text></View>
                        <View style={styles.form}>
                            <FieldInput
                                style={{marginTop: 20}}
                                onChangeText={this.handleUpdateName}
                                value={this.state.name}
                            >Name</FieldInput>
                            <FieldInput
                                style={{marginTop: 20}}
                                onChangeText={this.handleUpdateType}
                                value={this.state.type}
                            >Type</FieldInput>
                            <FieldInput
                                style={{marginTop: 20}}
                                onChangeText={this.handleUpdateQuantity}
                                value={this.state.quantity}
                            >Quantity</FieldInput>
                            <FieldInput
                                style={{marginTop: 20}}
                                onChangeText={this.handleUpdateLocation}
                                value={this.state.location}
                            >Location</FieldInput>
                            <FieldInput
                                style={{marginTop: 20 ,marginBottom: 30}}
                                onChangeText={this.handleUpdateDescription}
                                value={this.state.description}
                            >Description</FieldInput>
                            <Button
                                style={styles.button}
                                onPress={() => {
                                    Keyboard.dismiss();
                                    this.handleAddItem();
                                }}
                            >
                                <Text>Add Item</Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    greeting: {
        padding: 20,
        fontSize: 40,
        fontWeight: "bold",
        textAlign: 'center',
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
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },
    back: {
        position: "absolute",
        top: 10,
        left: 17,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "rgba(21,22,48,0.1)",
        alignItems: 'center',
        justifyContent: 'center'
    }
})
