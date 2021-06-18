import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { logUserIn } from "../apollo";
import { login, loginVariables } from "../__generated__/login";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import styled from "styled-components/native";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

const TextInput = styled.TextInput<{ lastOne?: boolean }>`
  background-color: rgba(255, 255, 255, 0.15);
  padding: 15px 7px;
  border-radius: 4px;
  color: ${(props) => props.theme.fontColor};
  margin-bottom: ${(props) => (props.lastOne ? "15" : 8)}px;
`;

export default function Login() {
  const { register, handleSubmit, watch, setValue } = useForm();
  const passwordRef = useRef();
  const onNext = (nextOne: any) => {
    nextOne?.current?.focus();
  };
  const onCompleted = async (data: login) => {
    const {
      login: { ok, token },
    } = data;
    if (ok && token) {
      await logUserIn(token);
    }
  };
  const [logInMutation, { loading }] = useMutation<login, loginVariables>(
    LOGIN_MUTATION,
    {
      onCompleted,
    }
  );
  const onValid = ({ username, password }: loginVariables) => {
    if (!loading) {
      logInMutation({
        variables: {
          username,
          password,
        },
      });
    }
  };
  useEffect(() => {
    register("username", { required: true });
    register("password", { required: true });
  }, [register]);
  return (
    <AuthLayout>
      <TextInput
        value={watch("username")}
        placeholder="Username"
        placeholderTextColor={"#c7c7cd"}
        returnKeyType="next"
        autoCapitalize="none"
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text: string) => setValue("username", text)}
      />
      <TextInput
        value={watch("password")}
        ref={passwordRef}
        placeholder="Password"
        placeholderTextColor={"#c7c7cd"}
        secureTextEntry
        returnKeyType="done"
        lastOne={true}
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text: string) => setValue("password", text)}
      />
      <AuthButton
        text="Log In"
        loading={loading}
        disabled={!watch("username") || !watch("password")}
        onPress={handleSubmit(onValid)}
      ></AuthButton>
    </AuthLayout>
  );
}
