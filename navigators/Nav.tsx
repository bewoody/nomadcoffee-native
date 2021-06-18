import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabIcon from "../components/nav/TabIcon";
import SharedStackNav from "./SharedStackNav";
import { useTheme } from "styled-components";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo";

const Tabs = createBottomTabNavigator();

export default function Nav() {
  const theme = useTheme();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <Tabs.Navigator
      tabBarOptions={{
        showLabel: false,
        activeTintColor: theme.fontColor,
        style: {
          backgroundColor: theme.bgColor,
          borderTopColor: theme.borderColor,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName={"home"} focused={focused} color={color} />
          ),
        }}
      >
        {() => <SharedStackNav screenName={"Home"} />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName={"search"} focused={focused} color={color} />
          ),
        }}
      >
        {() => <SharedStackNav screenName={"Search"} />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Me"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName={"person"} focused={focused} color={color} />
          ),
        }}
      >
        {() =>
          isLoggedIn ? (
            <SharedStackNav screenName={"Me"} />
          ) : (
            <SharedStackNav screenName={"Login"} />
          )
        }
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
