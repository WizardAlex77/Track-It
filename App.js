import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignUpContainer from './container/SignUpContainer';

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
