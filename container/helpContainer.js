import React, { Component } from "react";
import {Text, View, StyleSheet, Image, TouchableOpacity, Keyboard} from "react-native";
import {Icon} from "native-base";
import Button from "../component/Button";

export default class helpContainer extends Component {


    render() {
        return (
            <View style={styles.container}>

                <Image
                    style={styles.background1}
                    source={require("../assets/settingBackground2.png")}
                />
                <Image
                    style={styles.background2}
                    source={require("../assets/settingBackground1.png")}
                />

                <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                    <Icon name="ios-arrow-round-back" size={32} color="#FFF" />
                </TouchableOpacity>



                <View style={styles.greeting}>
                    <Text
                        style={{ fontSize: 35, padding: "5%", fontWeight: "bold" }}
                    >
                        How can we help?
                    </Text>
                    <Image
                        style={styles.library}
                        source={require("../assets/library.png")}
                    />


                </View>

                <View style={styles.form}>
                    <Button
                        onPress={this.handlePickAvatar}
                        style={styles.button}
                    >
                        <Text>Items Help</Text>
                    </Button>

                    <Button
                        onPress={() => {
                            Keyboard.dismiss();
                            this.props.navigation.navigate("householdSettings");
                        }}
                        style={styles.button}
                    >
                        <Text>Household Help</Text>
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
        //position: 'absolute',
        top: 70,
        alignItems: 'center',
        width: "100%"
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30,
        marginTop: -30
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
        backgroundColor: "#70bee2",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },
    back: {
        position: "absolute",
        top: 30,
        left: 17,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "rgba(21,22,48,0.1)",
        alignItems: 'center',
        justifyContent: 'center'
    },
    background1: {
        position: 'absolute',
        width: "100%",
        height: "100%",
        top: -150,
        resizeMode: "contain",
    },
    background2: {
        position: 'absolute',
        width: "100%",
        height: "100%",
        top: -150,
        resizeMode: "contain",
    },
    library: {
        resizeMode: "contain",
        width: 300,
        height: 300,
        top: -60
    }
})