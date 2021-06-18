import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.bgColor};
`;

export default function Profile() {
  return (
    <Container>
      <Text>Profile</Text>
    </Container>
  );
}
