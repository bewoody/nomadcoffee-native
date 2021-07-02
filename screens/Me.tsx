import React, { useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import ScreenLayout from "../components/ScreenLayout";
import useMe from "../hooks/useMe";
import { RouteProps } from "../types";
import UploadAvatar from "./UploadAvatar";

const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 25px;
`;

const DefaultAvatar = styled.View`
  background-color: black;
  width: 100px;
  height: 100px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 14px;
`;

const Username = styled.Text`
  color: beige;
  font-size: 30px;
`;

export default function Me({ navigation }: RouteProps) {
  const { data, loading } = useMe();
  const InitialName = data?.me?.username.charAt(0).toUpperCase();
  useEffect(() => {
    navigation.setOptions({
      title: data?.me?.username,
    });
  }, []);
  return (
    <ScreenLayout loading={loading}>
      <TouchableOpacity onPress={() => navigation.navigate("Upload")}>
        {data?.me?.avatarURL ? (
          <Avatar source={{ uri: data?.me?.avatarURL }} />
        ) : (
          <DefaultAvatar>
            <Username>{InitialName}</Username>
          </DefaultAvatar>
        )}
      </TouchableOpacity>
      <Text>{data?.me?.username}</Text>
    </ScreenLayout>
  );
}
