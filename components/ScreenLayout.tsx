import React from "react";
import { ActivityIndicator, Platform } from "react-native";
import styled, { useTheme } from "styled-components/native";

interface IScreenLayoutProps {
  loading?: boolean;
  children: any;
}

const Container = styled.View`
  background-color: ${(props) => props.theme.bgColor};
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default function ScreenLayout({
  loading,
  children,
}: IScreenLayoutProps) {
  const theme = useTheme();
  return (
    <Container>
      {loading ? (
        <ActivityIndicator
          color={Platform.OS !== "web" ? theme.fontColor : "black"}
        />
      ) : (
        children
      )}
    </Container>
  );
}
