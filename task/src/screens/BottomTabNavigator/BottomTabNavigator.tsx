import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import HomeStackScreen from "../HomeStack/HomeStack";
import ProfileStackScreen from "../ProfileStack/ProfileStack";
const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeStack" component={HomeStackScreen} />
      <Tab.Screen name="ProfileStack" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
}
