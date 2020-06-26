import React, { Component } from "react";
import {ActivityIndicator, FlatList, StyleSheet, Text, View, Image} from "react-native";
import firebaseDb from "../firebaseDb";

export default class InventoryContainer extends Component {
    state = {
        isLoading: true,
        users: null
    }
}

    /*   componentDidMount() {
        const {imageName} = this.state;
     let imageRef = firebaseDb.firestore().collection('users')
            .doc('12LsTRqNugb7h7BczYXX')
            .collection('Items')
            .ref('/' + imageName);
        imageRef.getDownloadURL()
            .then((url) => {
                //from url you can fetched the uploaded image easily
                this.setState({profileImageUrl: url});
            })
            .catch((e) => console.log('getting downloadURL of image error => ', e));*/
    /*    firebaseDb.firestore().collection('users')
            .doc('12LsTRqNugb7h7BczYXX')
            .collection('Items')
            .get()
            .then((querySnapshot) => {
                const results = [];
                querySnapshot.docs.map((documentSnapshot) =>
                    results.push(documentSnapshot.data())
                );
                this.setState({isLoading: false, users: results});
            }).catch(err => console.error(err));
    }

    constant ref = firebase.storage().ref('path/to/image.jpg');
    constant url = await ref.getDownloadURL();

    render() {
        const { isLoading, users } = this.state;
        if (isLoading) {
            return <ActivityIndicator />;
        }
        else {
            return <FlatList
                data={users}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <Text>{item.Name}</Text>
                        <Text>{item.Description}</Text>
                        <Image
                            source={{ uri: url }}
                        />
                    </View>
                )}
                keyExtractor={item => item.email}
            />;
        }
    }
}
*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    }
})