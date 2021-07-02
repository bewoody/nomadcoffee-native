import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useState } from "react";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { AppearanceProvider } from "react-native-appearance";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles/styles";
import { useColorScheme } from "react-native";
import { ApolloProvider } from "@apollo/client";
import client, { isLoggedInVar, logUserOut, tokenVar } from "./apollo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoggedInNav from "./navigators/LoggedInNav";

export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const color = useColorScheme();
  const preloadAssets = async () => {
    const fontsToLoad = [Ionicons.font];
    const images = [require("./assets/logo.png")];
    const cacheFonts = fontsToLoad.map((font) => Font.loadAsync(font));
    const cacheImages = images.map((image) => Asset.loadAsync(image));
    await Promise.all<any>([...cacheImages, ...cacheFonts]);
  };
  const preload = async () => {
    const token = await AsyncStorage.getItem("authorization");
    if (token) {
      isLoggedInVar(Boolean(token));
      tokenVar(token);
    }
    return preloadAssets();
  };

  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }
  return (
    <ApolloProvider client={client}>
      <AppearanceProvider>
        <ThemeProvider theme={color === "dark" ? darkTheme : lightTheme}>
          <StatusBar />
          <NavigationContainer>
            <LoggedInNav />
          </NavigationContainer>
        </ThemeProvider>
      </AppearanceProvider>
    </ApolloProvider>
  );
}
