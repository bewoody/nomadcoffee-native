/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchCoffeeShops
// ====================================================

export interface searchCoffeeShops_searchCoffeeShops_photos {
  __typename: "CoffeeShopPhoto";
  url: string;
}

export interface searchCoffeeShops_searchCoffeeShops {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  photos: (searchCoffeeShops_searchCoffeeShops_photos | null)[] | null;
}

export interface searchCoffeeShops {
  searchCoffeeShops: (searchCoffeeShops_searchCoffeeShops | null)[] | null;
}

export interface searchCoffeeShopsVariables {
  keyword: string;
}
