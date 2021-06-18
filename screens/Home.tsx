import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useState } from "react";
import { FlatList, ListRenderItem } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import Shop from "../components/Shop";
import {
  seeCoffeeShops,
  seeCoffeeShopsVariables,
  seeCoffeeShops_seeCoffeeShops,
} from "../__generated__/seeCoffeeShops";

const SEECOFFEESHOPS_QUERY = gql`
  query seeCoffeeShops($lastId: Int) {
    seeCoffeeShops(lastId: $lastId) {
      id
      name
      photos {
        url
      }
      categories {
        name
      }
      isMine
    }
  }
`;

export default function Home() {
  const { data, loading, refetch, fetchMore } =
    useQuery<seeCoffeeShops, seeCoffeeShopsVariables>(SEECOFFEESHOPS_QUERY);
  const renderShop: ListRenderItem<seeCoffeeShops_seeCoffeeShops> = ({
    item,
  }) => {
    return <Shop shop={item} />;
  };
  const [refreshing, setRefreshing] = useState(false);
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const onEndReached = () => {
    if (data?.seeCoffeeShops) {
      const length = data?.seeCoffeeShops.length;
      if (length > 0) {
        fetchMore({
          variables: {
            lastId: data?.seeCoffeeShops[length - 1]?.id,
          },
        });
      }
    }
  };
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        onEndReachedThreshold={0.02}
        onEndReached={onEndReached}
        refreshing={refreshing}
        onRefresh={refresh}
        data={data?.seeCoffeeShops}
        showsVerticalScrollIndicator={false}
        keyExtractor={(shop) => "" + shop?.id}
        renderItem={renderShop}
      />
    </ScreenLayout>
  );
}
