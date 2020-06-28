import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { decode, encode } from "base-64";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import AddButton from "./component/AddButton";
import WishListContainer from "./container/WishListContainer";
import HouseHoldListContainer from "./container/HouseHoldListContainer";
import WelcomeContainer from "./container/WelcomeContainer";
import HomeContainer from "./container/HomeContainer";
import SignUpContainer from "./container/SignUpContainer";
import LogInContainer from "./container/LogInContainer";
import firebaseDb from "./firebaseDb";
import InventoryContainer from "./container/InventoryContainer";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

firebaseDb.firestore().settings({ experimentalForceLongPolling: true });

const AccountStack = createStackNavigator();
const MenuTab = createBottomTabNavigator();

export default function App() {
  const createBottomTab = () => {
    return (
      <MenuTab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: "#e91e63",
          showLabel: false,
        }}
      >
        <MenuTab.Screen
          name="Home"
          component={HomeContainer}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Icon name="ios-home" color={color} size={size} />
            ),
          }}
        />
        <MenuTab.Screen
          name="Inventory"
          component={InventoryContainer}
          options={{
            tabBarLabel: "Inventory",
            tabBarIcon: ({ color, size }) => (
              <Icon name="ios-folder" color={color} size={size} />
            ),
          }}
        />
        <MenuTab.Screen
          name="A"
          component={AddButton}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="ios-add-circle" color="red" size={size} />
            ),
          }}
        />
        <MenuTab.Screen
          name="WishList"
          component={WishListContainer}
          options={{
            tabBarLabel: "WishList",
            tabBarIcon: ({ color, size }) => (
              <Icon name="ios-heart" color={color} size={size} />
            ),
          }}
        />
        <MenuTab.Screen
          name="HouseHold"
          component={HouseHoldListContainer}
          options={{
            tabBarLabel: "HouseHold",
            tabBarIcon: ({ color, size }) => (
              <Icon name="ios-person" color={color} size={size} />
            ),
          }}
        />
      </MenuTab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <AccountStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="WelcomeSplash"
      >
        <AccountStack.Screen
          name="WelcomeSplash"
          component={WelcomeContainer}
        />
        <AccountStack.Screen name="Log In" component={LogInContainer} />
        <AccountStack.Screen name="Sign Up" component={SignUpContainer} />
        <AccountStack.Screen name="Main" children={createBottomTab} />
      </AccountStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
