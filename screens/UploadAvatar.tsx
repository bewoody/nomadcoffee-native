import React, { useEffect } from "react";
import { ReactNativeFile } from "apollo-upload-client";
import { ActivityIndicator, Platform, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";
import { useForm } from "react-hook-form";
import DismissKeyboard from "../components/DismissKeyboard";
import { RouteProps } from "../types";
import { gql, useMutation } from "@apollo/client";

const EDITPROFILE_MUTATION = gql`
  mutation editProfile($avatarURL: Upload) {
    editProfile(avatarURL: $avatarURL) {
      ok
      error
    }
  }
`;

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.bgColor};
  padding: 0px 50px;
`;
const Photo = styled.Image`
  height: 350px;
`;

const HeaderRightText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

export default function UploadAvatar({
  route: {
    params: { file: uri },
  },
  navigation,
}: RouteProps) {
  const [editProfileMutation, { loading }] = useMutation(EDITPROFILE_MUTATION);
  const { handleSubmit } = useForm();
  const HeaderRight = () => (
    <TouchableOpacity onPress={handleSubmit(onValid)}>
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );
  const HeaderRightLoading = () => (
    <ActivityIndicator size="small" color="white" style={{ marginRight: 10 }} />
  );
  const onValid = async () => {
    const avatarURL = new ReactNativeFile({
      uri,
      name: "file.jpg",
      type: "image/jpeg",
    });
    await editProfileMutation({
      variables: {
        avatarURL,
      },
    });
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderRightLoading : HeaderRight,
      ...(loading && { headerLeft: () => null }),
    });
  }, [loading]);
  return (
    <DismissKeyboard>
      <Container
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <Photo resizeMode="contain" source={{ uri }} />
      </Container>
    </DismissKeyboard>
  );
}
