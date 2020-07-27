import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { decode, encode } from "base-64";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import SettingsContainer from "./container/SettingsContainer";
import WelcomeContainer from "./container/WelcomeContainer";
import HomeContainer from "./container/HomeContainer";
import SignUpContainer from "./container/SignUpContainer";
import LogInContainer from "./container/LogInContainer";
import firebaseDb from "./firebaseDb";
import InventoryContainer from "./container/InventoryContainer";
import AddToInventoryContainer from "./container/AddToInventoryContainer"
import { Provider } from 'react-redux';
import { store } from './app-redux';
import ExpiringItemsContainer from "./container/ExpiringItemsContainer";
import joinHouseholdContainer from "./container/joinHouseholdContainer";
import joinRequestsContainer from "./container/joinRequestsContainer";
import householdSettingsContainer from "./container/householdSettingsContainer";
import memberListContainer from "./container/memberListContainer";
import helpContainer from "./container/helpContainer";
import itemHelpContainer from "./container/itemHelpContainer";
import householdHelpContainer from "./container/householdHelpContainer";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

firebaseDb.firestore().settings({ experimentalForceLongPolling: true });

const AccountStack = createStackNavigator();
const MenuTab = createBottomTabNavigator();
const SettingStack = createStackNavigator();

export default function App() {
    const createSettingStack = () => {
        return (
            <SettingStack.Navigator initialRouteName="Settings" headerMode="none">
                <SettingStack.Screen
                    name="Settings"
                    component={SettingsContainer}
                    options={{
                        headerShown: false
                    }}
                />
                <SettingStack.Screen
                name="householdSettings"
                component={householdSettingsContainer}
                />
                <SettingStack.Screen
                    name="JoinOther"
                    component={joinHouseholdContainer}
                />
                <SettingStack.Screen
                    name="requests"
                    component={joinRequestsContainer}
                />
                <SettingStack.Screen
                    name="memberList"
                    component={memberListContainer}
                />
                <SettingStack.Screen
                    name="helpPage"
                    component={helpContainer}
                />
                <SettingStack.Screen
                    name="itemHelp"
                    component={itemHelpContainer}
                />
                <SettingStack.Screen
                    name="householdHelp"
                    component={householdHelpContainer}
                />
            </SettingStack.Navigator>
        )
    }

    const createBottomTab = () => {
    return (
      <MenuTab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: "#70bee2",
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
          name="Add Item"
          //children={createAddItemStack}
          component={AddToInventoryContainer}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="ios-add-circle" color={color} size={40} />
            ),
          }}
        />
        <MenuTab.Screen
          name="Expiring Items"
          component={ExpiringItemsContainer}
          options={{
            tabBarLabel: "Expiring Items",
            tabBarIcon: ({ color, size }) => (
              <Icon name="ios-alert" color={color} size={size} />
            ),
          }}
        />
        <MenuTab.Screen
          name="HouseHold"
          children={createSettingStack}
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
    <Provider store={store}>
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
    </Provider>
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
