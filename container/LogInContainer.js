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
    Alert, ActivityIndicator
} from "react-native";
import firebaseDb from "../firebaseDb";
import Button from "../component/Button";
import Fire from "../Fire";
import {StaticEmailInput, StaticPasswordInput} from "../component/StaticInput";
import {Icon, Input, Item, Label} from "native-base";

const firebase = require("firebase");
require("firebase/firestore");

class LogInContainer extends Component {
  state = {
      loading: false,
      email: "",
      password: "",
  };

  handleUpdateEmail = (email) => this.setState({ email });
  handleUpdatePassword = (password) => this.setState({ password });
  handleSignIn = (email, password) => {
      this.setState({loading: true});
      firebaseDb.auth()
          .signInWithEmailAndPassword(email, password)
          .then((userInfo) => {
                  let household = "";
                  let householdName = "";

                  firebaseDb
                      .firestore()
                      .collection("users")
                      .doc(String(email))
                      .get()
                      .then(doc => {
                          household = doc.get("household");
                          householdName = doc.get("householdName")

                          userInfo.user.updateProfile({photoURL: household}).then(() => {
                              console.log("updated household to be " + household);
                              this.setState({loading: false});
                              this.props.navigation.navigate("Main");
                              if (doc.get("status") === "justJoined") {
                                  firebaseDb.firestore().collection("users").doc(String(email)).set({status: 'nil'}, {merge: true}).then(() => Alert.alert("Your HouseHold Application has been approved", "You are now part of " + householdName + "'s household!"));
                              } else if (doc.get('status') === "removed") {
                                  firebaseDb.firestore().collection("users").doc(String(email)).set({status: 'nil'}, {merge: true}).then(() => Alert.alert("You have been removed from your previous household", "You have been returned to your own household"));
                              }
                          });
                          console.log("updated fake photoUrl to" + household);

                      });
                  this.setState({
                      email: "",
                      password: ""
                  });
              }
          )
          .catch((err) => {Alert.alert("No Such Account", "Please enter a valid account"); this.setState({loading: false});});
  }

  render() {
      const { loading } = this.state;
      if (loading) {
          return (
              <View style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 70
              }}>
                  <ActivityIndicator />
              </View>
          )
      } else {
        return (
            <SafeAreaView>
                <ScrollView>
                    <KeyboardAvoidingView behavior="padding" style={styles.container}>
                        <Image
                            style={styles.background}
                            source={require("../assets/log_in_background.png")}
                        />
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
                                      Alert.alert("Empty fields","Please enter username and password");
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
        backgroundColor: "#70bee2",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },
    background: {
        position: 'absolute',
        width: "100%",
        height: "100%",
        top: -170,
        resizeMode: "contain",
    }
})

export default LogInContainer;
