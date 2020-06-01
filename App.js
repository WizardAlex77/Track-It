import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import SignUpContainer from './container/SignUpContainer';
import UserListContainer from "./container/UserList";
import LogInContainer from "./container/LogInContainer";
import HomeContainer from "./container/HomeContainer";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {decode, encode} from 'base-64';

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
        >
          <Stack.Screen name="Log In" component={LogInContainer} />
          <Stack.Screen name="Sign Up" component={SignUpContainer} />
          <Stack.Screen name="Home" component={HomeContainer} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
