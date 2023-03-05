import { ApolloClient, InMemoryCache } from "@apollo/client";

const GRAPHQL_URL = process.env.NEXT_PUBLIC_HYGRAPH_API;

const getEnvVar = (var) => {
  return `process.env.${var}`
}

export const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});
