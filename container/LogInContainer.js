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
import {Icon, Input, Item, Label} from "native-base";

class LogInContainer extends Component {
  state = {
    name: "",
    password: "",
  };

  handleUpdateName = (name) => this.setState({ name });
  handleUpdateEmail = (email) => this.setState({ email });
  handleUpdatePassword = (password) => this.setState({ password });
  handleSignIn = (email, password) =>
    firebaseDb.auth()
        .signInWithEmailAndPassword(email, password)
        .then( (value) => {
              this.setState({
                name: "",
                password: ""
              });
              this.props.navigation.navigate("Main");
            }
        )
        .catch((err) => alert("No Such Account"));
  /*
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
      }); */

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

              <Item floatingLabel style={styles.input}>
                <Icon active name="mail" />
                <Label>Email</Label>
                <Input
                    onChangeText={this.handleUpdateName}
                    value={this.state.name}
                />
              </Item>

              <PasswordTextBox
                icon="lock"
                label="Password"
                onChange={this.handleUpdatePassword}
                value={this.state.password}
                style={[styles.input, {marginBottom: 30}]}
                returnKeyType="go"
              />

              <Button
                  style={styles.button}
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
  input: {
    height: 75,
    fontSize: 15,
    color: "#161F3D",
    marginTop: 14
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "#E9446A",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center"
  }
})
/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
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
    width: 250,
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
*/

export default LogInContainer;
