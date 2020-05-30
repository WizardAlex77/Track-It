import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import SignUpContainer from './container/SignUpContainer';
import UserListContainer from "./container/UserList";

export default function App() {
  return (
    <View style={styles.container}>
      <UserListContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
