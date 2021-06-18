import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface ITabIconProps {
  iconName: string;
  color: string;
  focused: boolean;
}

export default function TabIcon({ iconName, color, focused }: ITabIconProps) {
  return (
    <Ionicons
      name={focused ? iconName : `${iconName}-outline`}
      color={color}
      size={26}
    />
  );
}
