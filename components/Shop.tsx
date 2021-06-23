import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, Image } from "react-native";
import styled from "styled-components/native";
import { seeCoffeeShops_seeCoffeeShops } from "../__generated__/seeCoffeeShops";

const screen = Dimensions.get("screen");

const Container = styled.View``;

const PhotoItemWrapper = styled.TouchableOpacity`
  justify-content: space-between;
  width: ${screen.width}px;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 20px;
`;
const Photo = styled.Image``;
const CafeInfo = styled.View`
  padding: 8px 10px;
`;
const CafeName = styled.Text`
  font-weight: 600;
  font-size: 18px;
`;
const CategoryData = styled.View`
  margin-top: 6px;
  flex-direction: row;
`;
const CategoryName = styled.Text`
  font-size: 16px;
  color: black;
  margin-right: 8px;
`;

interface IShopProps {
  shop: seeCoffeeShops_seeCoffeeShops;
}

export default function Shop({ shop }: IShopProps) {
  const navigation = useNavigation();
  const [imageHeight, setImageHeight] = useState(screen.height - 400);
  const photoUrl = shop.photos?.slice(0, 1)[0]?.url;
  useEffect(() => {
    if (photoUrl) {
      Image.getSize(photoUrl, (w, h) => {
        if (w !== 0) {
          setImageHeight((screen.width * h) / w);
        }
      });
    }
  }, [photoUrl]);
  return (
    <PhotoItemWrapper
      onPress={() => navigation.navigate("Shop", { id: shop.id })}
    >
      <Photo
        style={{ width: screen.width, height: imageHeight }}
        source={{ uri: shop.photos?.slice(0, 1)[0]?.url }}
      />
      <CafeInfo>
        <CafeName>{shop.name}</CafeName>
        <CategoryData>
          {shop.categories?.map((category: any, index: number) => (
            <CategoryName key={index}>#{category?.name}</CategoryName>
          ))}
        </CategoryData>
      </CafeInfo>
    </PhotoItemWrapper>
  );
}
