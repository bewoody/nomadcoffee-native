import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Asset } from "expo-asset";
import * as Font from "expo-font";

export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const preload = async () => {
    const images = [require("./assets/logo.png")];
    const fontsToLoad = [Ionicons.font];
    const cacheImages = images.map((image) => Asset.loadAsync(image));
    const cacheFonts = fontsToLoad.map((font) => Font.loadAsync(font));
    await Promise.all<any>([...cacheImages, ...cacheFonts]);
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
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
