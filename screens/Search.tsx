import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TouchableOpacity, useWindowDimensions } from "react-native";
import { Image } from "react-native";
import styled from "styled-components/native";
import { RouteProps } from "../types";
import DismissKeyboard from "../components/DismissKeyboard";
import {
  searchCoffeeShops,
  searchCoffeeShopsVariables,
} from "../__generated__/searchCoffeeShops";
import { FlatList } from "react-native";

const SEARCH_COFFEESHOPS = gql`
  query searchCoffeeShops($keyword: String!) {
    searchCoffeeShops(keyword: $keyword) {
      id
      name
      photos {
        url
      }
    }
  }
`;

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.bgColor};
`;

const MessageContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const MessageText = styled.Text`
  margin-top: 15px;
  color: white;
  font-weight: 600;
`;

const Input = styled.TextInput<{ width: number }>`
  background-color: rgba(255, 255, 255, 1);
  color: black;
  width: ${(props) => props.width / 1.5}px;
  padding: 5px 10px;
  border-radius: 7px;
`;

export default function Search({ navigation }: RouteProps) {
  const numColumns = 3;
  const { width } = useWindowDimensions();
  const { setValue, register, handleSubmit } = useForm();
  const [startQueryFn, { loading, data, called }] =
    useLazyQuery<searchCoffeeShops, searchCoffeeShopsVariables>(
      SEARCH_COFFEESHOPS
    );
  const onValid = ({ keyword }: searchCoffeeShopsVariables) => {
    startQueryFn({
      variables: {
        keyword,
      },
    });
  };
  const SearchBox = () => (
    <Input
      width={width}
      placeholderTextColor="rgba(0, 0, 0, 0.8)"
      placeholder="Search CoffeeShops"
      autoCapitalize="none"
      returnKeyLabel="Search"
      returnKeyType="search"
      autoCorrect={false}
      onChangeText={(text) => setValue("keyword", text)}
      onSubmitEditing={handleSubmit(onValid)}
    />
  );
  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register("keyword");
  }, []);
  const renderItem = ({ item: shop }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Shop", {
          shopId: shop.id,
        })
      }
    >
      <Image
        source={{ uri: shop.photos?.slice(0, 1)[0]?.url }}
        style={{ width: width / numColumns, height: 100 }}
      />
    </TouchableOpacity>
  );
  return (
    <DismissKeyboard>
      <Container>
        {loading ? (
          <MessageContainer>
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <MessageText>Search by keyword</MessageText>
          </MessageContainer>
        ) : null}
        {data?.searchCoffeeShops !== undefined ? (
          data?.searchCoffeeShops?.length === 0 ? (
            <MessageContainer>
              <MessageText>Could not find anything.</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              numColumns={numColumns}
              data={data?.searchCoffeeShops}
              keyExtractor={(shop) => "" + shop?.id}
              renderItem={renderItem}
            />
          )
        ) : null}
      </Container>
    </DismissKeyboard>
  );
}
