import React from 'react';
import { StyleSheet, View, Image, TextInput, Text } from 'react-native';


class SignUpContainer extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
    };

    handleUpdateName = (name) => this.setState({ name });
    handleUpdateEmail = (email) => this.setState({ email });
    handleUpdatePassword = (password) => this.setState({ password });

    render() {
        return (
            <View style={styles.container}>
                <Text> hello world </Text>
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
                    onChangeText={this.handleUpdateName}
                    value={this.state.email}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    onChangeText={this.handleUpdateName}
                    value={this.state.password}
                />
            </View>
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
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'black',
        fontSize: 28,
        marginBottom: 8,
        width: 200,
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
});

export default SignUpContainer
