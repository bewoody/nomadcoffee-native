import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.bgColor};
`;

export default function Shop() {
  return (
    <Container>
      <Text>Shop</Text>
    </Container>
  );
}
