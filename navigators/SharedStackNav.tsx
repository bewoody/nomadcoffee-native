import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Image } from "react-native";
import { useTheme } from "styled-components";
import Home from "../screens/Home";
import Login from "../screens/Login";
import Me from "../screens/Me";
import Profile from "../screens/Profile";
import Search from "../screens/Search";
import Shop from "../screens/Shop";

interface ISharedStackNavProps {
  screenName: string;
}

const Stack = createStackNavigator();

export default function SharedStackNav({ screenName }: ISharedStackNavProps) {
  const theme = useTheme();
  return (
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: theme.fontColor,
        headerStyle: {
          shadowColor: theme.borderColor,
          borderBottomColor: theme.borderColor,
          backgroundColor: theme.bgColor,
        },
      }}
    >
      {screenName === "Home" ? (
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: () => (
              <Image
                style={{
                  width: 120,
                  height: 40,
                }}
                resizeMode="contain"
                source={require("../assets/logo.png")}
              />
            ),
          }}
        />
      ) : null}
      {screenName === "Search" ? (
        <Stack.Screen name="Search" component={Search} />
      ) : null}
      {screenName === "Me" ? <Stack.Screen name="Me" component={Me} /> : null}
      {screenName === "Login" ? (
        <Stack.Screen name="Login" component={Login} />
      ) : null}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Shop" component={Shop} />
    </Stack.Navigator>
  );
}
