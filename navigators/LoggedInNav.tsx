import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import Nav from "./Nav";
import UploadNav from "./UploadNav";
import UploadAvatar from "../screens/UploadAvatar";

const Stack = createStackNavigator();

const LoggedInNav = () => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Tabs"
        options={{ headerShown: false }}
        component={Nav}
      />
      <Stack.Screen
        name="Upload"
        options={{ headerShown: false }}
        component={UploadNav}
      />
      <Stack.Screen
        name="UploadAvatar"
        options={{
          headerBackTitleVisible: false,
          headerBackImage: ({ tintColor }) => (
            <Ionicons color={tintColor} name="close" size={28} />
          ),
          title: "Upload",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "black",
          },
        }}
        component={UploadAvatar}
      />
    </Stack.Navigator>
  );
};

export default LoggedInNav;
