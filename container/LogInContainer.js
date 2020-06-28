import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  SafeAreaView,
} from "react-native";
import firebaseDb from "../firebaseDb";
import Button from "../component/Button";
import PasswordTextBox from "../component/PasswordTextBox";
import {StaticEmailInput, StaticPasswordInput} from "../component/StaticInput";
import {Icon, Input, Item, Label} from "native-base";

class LogInContainer extends Component {
  state = {
    email: "",
    password: "",
  };

  handleUpdateEmail = (email) => this.setState({ email });
  handleUpdatePassword = (password) => this.setState({ password });
  handleSignIn = (email, password) =>
    firebaseDb.auth()
        .signInWithEmailAndPassword(email, password)
        .then( (value) => {
              this.setState({
                email: "",
                password: ""
              });
              this.props.navigation.navigate("Main");
            }
        )
        .catch((err) => alert("No Such Account"));

  render() {
    return (
        <SafeAreaView>
            <ScrollView>
                <KeyboardAvoidingView behavior="padding" style={styles.container}>
                    <Image
                        style={styles.logo}
                        source={require("../assets/logo.png")}
                    />
                    <View style={styles.form}>
                        <StaticEmailInput onChangeText={this.handleUpdateEmail} value={this.state.email}>
                            Email
                        </StaticEmailInput>
                        <StaticPasswordInput style={{marginTop: 32, marginBottom: 30}} onChangeText={this.handleUpdatePassword} value={this.state.password}>
                            Password
                        </StaticPasswordInput>
                        <Button
                              style={styles.button}
                              onPress={() => {
                                Keyboard.dismiss();
                                if (
                                  this.state.email.length &&
                                  this.state.password.length
                                ) {
                                  this.handleSignIn(this.state.email, this.state.password);
                                } else {
                                  alert("Please enter username and password");
                                }
                              }}
                        >
                            <Text>Log In</Text>
                        </Button>
                        <Button
                            style={styles.button}
                            onPress={() => {
                                Keyboard.dismiss();
                                this.props.navigation.navigate("Sign Up");
                              }}
                        >
                            <Text>Sign Up</Text>
                        </Button>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
        greeting: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: "400",
        textAlign: 'center'
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
})

export default LogInContainer;
