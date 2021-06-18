import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Welcome from "../screens/Welcome";

const Stack = createStackNavigator();

export default function LoggedOutNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        options={{ headerShown: false }}
        component={Welcome}
      />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}
