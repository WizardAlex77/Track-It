import React, {Component} from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Image, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback} from 'react-native';
import firebaseDb from "../firebaseDb";
import Button from '../component/Button';

class HomeContainer extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Welcome!</Text>
                <Button onPress={() => {
                    Keyboard.dismiss();
                    this.props.navigation.navigate('Log In');
                }}
                >
                    <Text>Back</Text>
                </Button>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default HomeContainer