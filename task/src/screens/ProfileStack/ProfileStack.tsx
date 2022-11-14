import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import LoginScreen from "./LoginScreen";
import ProfileScreen from "./ProfileScreen";

const HomeStack = createNativeStackNavigator();

export default function ProfileStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Profile" component={ProfileScreen} />
      <HomeStack.Screen name="Login" component={LoginScreen} />
    </HomeStack.Navigator>
  );
}
