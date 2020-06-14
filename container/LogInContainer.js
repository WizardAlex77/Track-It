import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import firebaseDb from "../firebaseDb";
import Button from "../component/Button";
import PasswordTextBox from "../component/PasswordTextBox";
import TextBox from "../component/TextBox";
import { Item } from "native-base";

class LogInContainer extends Component {
  state = {
    name: "",
    password: "",
  };

  handleUpdateName = (name) => this.setState({ name });
  handleUpdateEmail = (email) => this.setState({ email });
  handleUpdatePassword = (password) => this.setState({ password });
  handleSignIn = (name, password) =>
    firebaseDb
      .firestore()
      .collection("users")
      .where("name", "==", name)
      .where("password", "==", password)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log("No Such Account");
          alert("No such account");
        } else {
          console.log("Logging In");
          this.setState({
            name: "",
            password: "",
          });
          this.props.navigation.navigate("Home");
        }
      })
      .catch((err) => {
        console.log("Error getting documents", err);
      });

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
            console.log("dismissed keyboard");
          }}
        >
          <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <ScrollView
              contentContainerStyle={{
                flex: 1,
              }}
            >
              <View style={styles.logoContainer}>
                <Image
                  style={styles.logo}
                  source={require("../assets/logo.png")}
                />
                <View style={styles.inputContainer}>
                  <TextBox
                    icon="person"
                    label="Username"
                    style={(styles.input, { marginBottom: 25, padding: 10 })}
                    onChange={this.handleUpdateName}
                    value={this.state.name}
                    returnKeyType="next"
                    onSubmitEditing={() => this.refs.passwordInput.focus()}
                  />
                  <PasswordTextBox
                    icon="lock"
                    label="Password"
                    onChange={this.handleUpdatePassword}
                    value={this.state.password}
                    style={[styles.input, { marginBottom: 25, padding: 10 }]}
                    ref={"passwordInput"}
                    returnKeyType="go"
                  />
                  <Button
                    style={styles.buttonContainer}
                    onPress={() => {
                      Keyboard.dismiss();
                      if (
                        this.state.name.length &&
                        this.state.password.length
                      ) {
                        this.handleSignIn(this.state.name, this.state.password);
                      } else {
                        alert("Please enter username and password");
                      }
                    }}
                  >
                    <Text>Log In</Text>
                  </Button>
                  <Button
                    onPress={() => {
                      Keyboard.dismiss();
                      this.props.navigation.navigate("Sign Up");
                    }}
                  >
                    <Text>Sign Up</Text>
                  </Button>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
  },
  logo: {
    width: 270,
    height: 110,
    resizeMode: "contain",
  },
  inputContainer: {
    width: 360,
    padding: 20,
    marginTop: 16,
  },
  input: {
    height: 40,
    width: 270,
    backgroundColor: "#d7dedc",
    marginBottom: 8,
    color: "black",
    paddingHorizontal: 10,
    borderColor: "gray",
    borderWidth: 1,
  },
  buttonContainer: {
    backgroundColor: "#2980b9",
    paddingVertical: 16,
    marginBottom: 8,
    marginTop: 8,
  },
  buttonText: {
    textAlign: "center",
    color: "black",
    fontWeight: "700",
  },
});

export default LogInContainer;
