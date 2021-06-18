import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.bgColor};
`;
const Logo = styled.Image`
  max-width: 50%;
  height: 100px;
`;
const Home = styled.View`
  background-color: ${colors.blue};
  padding: 7px 10px;
  border-radius: 3px;
`;
const HomeText = styled.Text`
  color: white;
  font-weight: 600;
`;

export default function Welcome() {
  return (
    <Container>
      <Logo resizeMode="contain" source={require("../assets/logo.png")} />
      <TouchableOpacity>
        <Home>
          <HomeText>Home</HomeText>
        </Home>
      </TouchableOpacity>
    </Container>
  );
}
