import { ApolloClient, InMemoryCache } from "@apollo/client";

const GRAPHQL_URL = process.env.NEXT_PUBLIC_HYGRAPH_API;

const getEnvVar = (keyEnv: string) => {
  // const value = process.env[keyEnv];
  // if (!value) {
  //   throw  new Error(`Env ${keyEnv} is not exist in file`)
  // }
  // return value;
};

export const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});
