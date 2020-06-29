import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Text,
    Keyboard, ScrollView, SafeAreaView, TouchableOpacity, Image,
} from "react-native";
import firebaseDb from "../firebaseDb";
import TextBox from "../component/TextBox";
import Button from "../component/Button";
import {FieldInput} from "../component/StaticInput";
import {Icon} from "native-base";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import Fire from "../Fire";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";

const firebase = require("firebase");
require("firebase/firestore");

export default class AddToInventoryContainer extends Component {
    state = {
        name: "",
        type: "",
        location:"",
        quantity:"",
        description:"",
        image: null,
    };

    componentDidMount() {
        this.getPhotoPermission().then(r => {console.log("obtained permission to photo library")});
    }

    getPhotoPermission = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

            if (status != "granted") {
                alert("We need permission to access your camera roll")
            }
        }
    }

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3]
        });

        if (!result.cancelled) {
            this.setState({ image: result.uri });
            console.log("image set to: " + this.state.image);
        }
    }

    handleAddItem2 = () => {
        Fire.shared.addItem({
                name: this.state.name,
                type: this.state.type,
                location: this.state.location,
                quantity: this.state.quantity,
                description: this.state.description,
                owner: firebaseDb.auth().currentUser.displayName,
                localUri: this.state.image })
            .then(ref => {
                this.setState({
                    name: "",
                    type: "",
                    location:"",
                    quantity:"",
                    description:"",
                    image: null
                });
                this.props.navigation.navigate("Home");
            })
    }

    displayDummy = () => {
        return <Ionicons name='ios-add' size={70} color="#FFF" />
    }
    displayImage = () => {
        return <Image source={{ uri: this.state.image }} style={styles.avatar} />
    }

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
                            <Text style={styles.greeting}>Add an Item!</Text>
                        </View>
                        <TouchableOpacity style={[styles.avatarPlaceHolder, {alignSelf: 'center'}]} onPress={this.pickImage}>
                            {this.state.image!=null && this.displayImage()}
                            {this.state.image==null && this.displayDummy()}
                        </TouchableOpacity>
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
                                    this.handleAddItem2();
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
    avatarPlaceHolder :{
        width: 100,
        height: 100,
        backgroundColor: "#E1E2E6",
        borderRadius: 50,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        position: 'absolute'
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
        backgroundColor: "#e9446a",
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
