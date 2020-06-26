import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

class WelcomeContainer extends React.Component {
    componentDidMount(){
        // Start counting when the page is loaded
        this.timeoutHandle = setTimeout(()=>{
            this.props.navigation.navigate("Log In")
        }, 3000);
    }

    componentWillUnmount(){
        clearTimeout(this.timeoutHandle);
        // This is just necessary in the case that the screen is closed
        // before the timeout fires, otherwise it would cause a memory leak
        // that would trigger the transition regardless, breaking the user experience.
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={require('../assets/logo.png')}
                />
            </View>
            )}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 270,
        height: 110,
        resizeMode: 'contain'
    }
})

export default WelcomeContainer