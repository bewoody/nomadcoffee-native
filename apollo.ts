import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createUploadLink } from "apollo-upload-client";
import { Platform } from "react-native";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

const TOKEN = "authorization";

export const logUserIn = async (token: string) => {
  await AsyncStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
  tokenVar(token);
};

export const logUserOut = async () => {
  await AsyncStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  tokenVar("");
};

const uploadHttpLink = createUploadLink({
  uri: "https://nomadcoffeee-backend.herokuapp.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: tokenVar(),
    },
  };
});

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log("GraphQL Error", graphQLErrors);
  }
  if (networkError) {
    console.log("Network Error", networkError);
  }
});

const client = new ApolloClient({
  link: authLink.concat(onErrorLink).concat(uploadHttpLink),
  cache: new InMemoryCache(),
});

export default client;
