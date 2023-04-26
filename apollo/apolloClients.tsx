import { ApolloClient, InMemoryCache } from "@apollo/client";

const GRAPHQL_URL = process.env.NEXT_PUBLIC_HYGRAPH_API;

export const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});

export const authClient = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});
