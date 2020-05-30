import React from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import firebaseDb from '../firebaseDb';

class UserListContainer extends React.Component {
    state = {
        isLoading: true,
        users: null
    }

    componentDidMount() {
        firebaseDb.firestore().collection('users')
            .get()
            .then((querySnapshot) => {
                const results = [];
                querySnapshot.docs.map((documentSnapshot) =>
                    results.push(documentSnapshot.data())
                );
                this.setState({isLoading: false, users: results});
            }).catch(err => console.error(err));
    }

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
                        <Text>{item.name}</Text>
                        <Text>{item.email}</Text>
                    </View>
                )}
                keyExtractor={item => item.email}
            />;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    }
})

export default UserListContainer;