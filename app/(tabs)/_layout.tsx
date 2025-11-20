import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import Profile from "./profile";
import Home from "./home";
import Events from "./events";
import MyEvents from "./my-events";

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  return (
    <Tab.Navigator>
      {/* <Tab.Screen name="Profile" component={Profile} /> */}
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Events" component={Events} />
      <Tab.Screen name="MyEvents" component={MyEvents} />
    </Tab.Navigator>
  );
}
