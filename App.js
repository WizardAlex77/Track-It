import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';
import SignUpContainer from './container/SignUpContainer';
import UserListContainer from "./container/UserList";
import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

export default function App() {
  return (
    <View style={styles.container}>
      <SignUpContainer />
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
