import React, { Component } from "react";
import {Text, View, StyleSheet, Image, TouchableOpacity, Keyboard} from "react-native";
import {Icon} from "native-base";


export default class itemHelpContainer extends Component {

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
                        How to add items
                    </Text>
                    <View style={{backgroundColor: 'rgba(255,255,255,0.38)', borderRadius: 100}}>
                        <Text
                            style={{ fontSize: 15, padding: "10%", paddingHorizontal: '15%', fontWeight: "normal" }}
                        >
                            Add items through the Add Items Page in the middle tab below!
                        </Text>
                    </View>

                    <View style={{backgroundColor: 'rgba(255,255,255,0)', borderRadius: 100}}>
                        <Text
                            style={{ color: "rgba(47,47,47,0.47)", fontSize: 12, marginHorizontal: "20%", marginTop: 20, marginBottom: 10, fontWeight: "normal" }}
                        >
                            <Text style={styles.bullet}>{'\u2B24'} </Text>You will only be able to delete your own items and items that are expiring
                        </Text>
                        <Text
                            style={{ color: "rgba(47,47,47,0.47)", fontSize: 12, marginHorizontal: "20%", marginBottom: 10, fontWeight: "normal" }}
                        >
                            <Text style={styles.bullet}>{'\u2B24'} </Text>Upon leaving a household that is not yours, all your items will be removed
                        </Text>
                        <Text
                            style={{ color: "rgba(47,47,47,0.47)", fontSize: 12, marginHorizontal: "20%", marginBottom: 10, fontWeight: "normal" }}
                        >
                            <Text style={styles.bullet}>{'\u2B24'} </Text>To edit an item, please delete and re-add the item
                        </Text>
                        <Text
                            style={{ color: "rgba(47,47,47,0.47)", fontSize: 12, marginHorizontal: "20%", marginBottom: 10, fontWeight: "normal" }}
                        >
                            <Text style={styles.bullet}>{'\u2B24'} </Text>Items can be searched for using any information related to the item
                        </Text>
                    </View>
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
    bullet: {
        fontSize: 8,
        marginLeft: 10,
        fontWeight: "normal"
    }
})