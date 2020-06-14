import React from "react";
import TextBox from "../component/TextBox";
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  BackHandler,
  TouchableOpacity,
} from "react-native";
import BackArrow from "../component/BackArrow";
import Button from "../component/Button";
import firebaseDb from "../firebaseDb";
import PasswordTextBox from "../component/PasswordTextBox";
import Icons from "react-native-vector-icons/MaterialIcons";

class SignUpContainer extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
  };

  handleUpdateName = (name) => this.setState({ name });
  handleUpdateEmail = (email) => this.setState({ email });
  handleUpdatePassword = (password) => this.setState({ password });
  handleUpdatePassword2 = (password2) => this.setState({ password2 });
  handleCreateUser = () => {
    firebaseDb
      .firestore()
      .collection("users")
      .add({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      })
      .then(() => {
        this.setState({
          name: "",
          email: "",
          password: "",
          password2: "",
        });
        this.props.navigation.navigate("Home");
      })
      .catch((err) => console.error(err));
  };

  handleRegister = () => {
    Keyboard.dismiss();
    if (
      this.state.name.length &&
      this.state.email.length &&
      this.state.password.length &&
      this.state.password2.length &&
      this.state.password == this.state.password2 &&
      this.state.email.includes("@")
    ) {
      this.handleCreateUser();
    } else if (
      !this.state.name.length ||
      !this.state.email.length ||
      !this.state.password.length ||
      !this.state.password2.length
    ) {
      alert("Please fill in all fields");
      console.log("Empty field");
    } else if (this.state.password != this.state.password2) {
      alert("Passwords do not match");
      console.log("Non matching passwords");
    } else if (!this.state.email.includes("@")) {
      alert("Invalid Email");
      console.log("Invalid Email");
    }
  };

  handleBackButtonClick = () => {
    Keyboard.dismiss();
    this.props.navigation.goBack();
  };

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
              <View>
                <TouchableOpacity onPress={this.handleBackButtonClick}>
                  <Icons
                    name={"arrow-back"}
                    size={30}
                    color="black"
                    style={{ marginLeft: "3%", marginTop: "16%" }}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.logoContainer}>
                <Text
                  style={{ fontSize: 35, padding: "5%", fontWeight: "bold" }}
                >
                  Let's get started!
                </Text>
                <Text>Create an account to use our features</Text>
                <View style={styles.inputContainer}>
                  <TextBox
                    icon="person"
                    label="Username"
                    style={(styles.input, { marginBottom: 25, padding: 10 })}
                    onChange={this.handleUpdateName}
                    value={this.state.name}
                    returnKeyType="next"
                    onSubmitEditing={() => this.emailInput.focus()}
                  />
                  <TextBox
                    icon="mail"
                    label="Email"
                    style={(styles.input, { marginBottom: 25, padding: 10 })}
                    onChange={this.handleUpdateEmail}
                    value={this.state.email}
                    returnKeyType="next"
                    onSubmitEditing={() => this.firstPasswordInput.focus()}
                    keyboardType="email-address"
                  />
                  <PasswordTextBox
                    icon="lock"
                    label="Password"
                    onChange={this.handleUpdatePassword}
                    value={this.state.password}
                    returnKeyType="next"
                    style={[styles.input, { marginBottom: 25, padding: 10 }]}
                    ref={(input) => (this.firstPasswordInput = input)}
                    onSubmitEditing={() => this.secondPasswordInput.focus()}
                  />
                  <PasswordTextBox
                    icon="lock"
                    label="Re-enter Password"
                    onChange={this.handleUpdatePassword2}
                    value={this.state.password2}
                    returnKeyType="go"
                    style={[styles.input, { marginBottom: 25, padding: 10 }]}
                    ref={(input) => (this.secondPasswordInput = input)}
                  />
                  <Button
                    onPress={this.handleRegister}
                    style={styles.buttonContainer}
                  >
                    <Text>Register</Text>
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
    padding: 20,
    width: 360,
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
    paddingVertical: 15,
    marginBottom: 10,
    marginTop: 16,
  },
  text: {
    fontSize: 20,
    color: "red",
    marginTop: 48,
  },
});

export default SignUpContainer;
