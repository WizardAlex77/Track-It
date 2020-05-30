import React from 'react';
import { StyleSheet, View, Image, TextInput, Text, KeyboardAvoidingView } from 'react-native';
import SignUpButton from "../component/SignUpButton";
import firebaseDb from "../firebaseDb"

class SignUpContainer extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        signUpDone: false
    };

    handleUpdateName = (name) => this.setState({ name });
    handleUpdateEmail = (email) => this.setState({ email });
    handleUpdatePassword = (password) => this.setState({ password });
    handleCreateUser = () => firebaseDb.firestore()
        .collection('users')
        .add({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }).then(() => this.setState({
            name: '',
            email: '',
            password: '',
            signUpDone: true
        }))
        .catch(err => console.error(err));

    render() {
        return (
            <KeyboardAvoidingView behaviour="padding" style={styles.container}>
                <Image style={styles.image} source={require('../assets/logo.png')} />
                <TextInput
                    style={styles.textInput}
                    placeholder="Name"
                    onChangeText={this.handleUpdateName}
                    value={this.state.name}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    onChangeText={this.handleUpdateEmail}
                    value={this.state.email}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    onChangeText={this.handleUpdatePassword}
                    value={this.state.password}
                />
                <SignUpButton
                    style={styles.button}
                    onPress={() => {
                        if (
                            this.state.name.length &&
                            this.state.email.length &&
                            this.state.password.length
                        ) {
                            this.handleCreateUser();
                        }
                    }}
                >
                    Sign Up
                </SignUpButton>
                {
                    this.state.signUpDone && <Text style={styles.text}>Sign Up Successful</Text>
                }
            </KeyboardAvoidingView>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        marginBottom: 40,
        width: 310,
        height: 110,
        resizeMode: 'contain',
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'black',
        fontSize: 20,
        marginBottom: 10,
        width: 250,
        height: 38,
    },
    button: {
        marginTop: 42,
    },
    text: {
        fontSize: 20,
        color: 'green',
        marginTop: 48,
    },
    buttonText: {
        fontSize: 20,
        color: 'black'
    }
});

export default SignUpContainer
