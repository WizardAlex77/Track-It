import React from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Button from "../component/Button";
import firebaseDb from "../firebaseDb";
import {StaticInput, StaticPasswordInput, StaticEmailInput} from "../component/StaticInput";
import {Icon, Input, Item, Label} from "native-base";
import Fire from "../Fire"


class SignUpContainer extends React.Component {
  state = {
     user: {
       name: "",
       email: "",
       password: "",
       password2: "",
       avatar: null
     }
  };

  handleUpdateName = (name) => this.setState({ user: { ...this.state.user, name }});
  handleUpdateEmail = (email) => this.setState({ user: { ...this.state.user, email }});
  handleUpdatePassword = (password) => this.setState({ user: { ...this.state.user, password }});
  handleUpdatePassword2 = (password2) => this.setState({ user: { ...this.state.user, password2 }});
  handleCreateUser = () => {
    Fire.shared.createProfile(this.state.user).then(() => {
      this.setState({
        name: "",
        email: "",
        password: "",
        password2: "",
      });
      this.props.navigation.navigate("Main");
    });
    /*
    firebaseDb.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((userInfo) => {
          userInfo.user.updateProfile({displayName: this.state.name}).then( () => {console.log(userInfo);});
          firebaseDb
              .firestore()
              .collection("users")
              .add({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                avatar: ""
              })
              .then(() => {
                this.setState({
                  name: "",
                  email: "",
                  password: "",
                  password2: "",
                });

              })
              .catch((err) => console.error(err));
        }) */
  }

   /* firebaseDb
      .firestore()
      .collection("users")
      .add({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        avatar: ""
      })
      .then(() => {
        this.setState({
          name: "",
          email: "",
          password: "",
          password2: "",
        });

      })
      .catch((err) => console.error(err));
  }; */

  handleRegister = () => {
    Keyboard.dismiss();
    if (
      this.state.user.name.length &&
      this.state.user.email.length &&
      this.state.user.password.length &&
      this.state.user.password2.length &&
      this.state.user.password == this.state.password2 &&
      this.state.user.email.includes("@")
    ) {
      this.handleCreateUser();
    } else if (
      !this.state.user.name.length ||
      !this.state.user.email.length ||
      !this.state.user.password.length ||
      !this.state.user.password2.length
    ) {
      alert("Please fill in all fields");
      console.log("Empty field");
    } else if (this.state.user.password != this.state.user.password2) {
      alert("Passwords do not match");
      console.log("Non matching passwords");
    } else if (!this.state.user.email.includes("@")) {
      alert("Invalid Email");
      console.log("Invalid Email");
    }
  };

  render() {
    return (

        <SafeAreaView>
        <ScrollView>
          <KeyboardAvoidingView behavior="padding" style={styles.container}>

            <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-arrow-round-back" size={32} color="#FFF" />
            </TouchableOpacity>

            <View style={styles.greeting}>
                <Text
                  style={{ fontSize: 35, padding: "5%", fontWeight: "bold" }}
                >
                  Let's get started!
                </Text>
                <Text>Create an account to use our features</Text>
            </View>

            <View style={styles.form}>
              <StaticInput style={{marginTop: 32}} onChangeText={this.handleUpdateName} value={this.state.user.name}>Name</StaticInput>
              <StaticEmailInput style={{marginTop: 32}} onChangeText={this.handleUpdateEmail} value={this.state.user.email}>Email</StaticEmailInput>
              <StaticPasswordInput style={{marginTop: 32}} onChangeText={this.handleUpdatePassword} value={this.state.user.password}>Password</StaticPasswordInput>
              <StaticPasswordInput style={{marginTop: 32, marginBottom: 30}} onChangeText={this.handleUpdatePassword2} value={this.state.user.password2}>Re-enter Password</StaticPasswordInput>
              <Button
                  style={styles.button}
                  onPress={() => {
                    Keyboard.dismiss();
                    this.handleCreateUser();
                  }}s
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
    position: 'absolute',
    top: 50,
    alignItems: 'center',
    width: "100%"
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
    marginTop: "50%"
  },
  logo: {
    marginTop: "20%",
    width: 270,
    height: 110,
    resizeMode: "contain",
    alignSelf: 'center'
  },
  input: {
    marginHorizontal: 30,
    marginLeft: 30,
    height: 75,
    fontSize: 15,
    color: "#161f3d",
    marginTop: 14
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

/*
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
    marginVertical: 100,
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
}); */

export default SignUpContainer;