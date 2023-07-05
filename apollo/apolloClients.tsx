import { ApolloClient, InMemoryCache } from "@apollo/client";

const GRAPHQL_URL = process.env.NEXT_PUBLIC_HYGRAPH_API;

export const getEnvVar = (keyEnv: string | undefined) => {
  if (!keyEnv) throw new Error(`Env ${keyEnv} does not exist`);
  return keyEnv;
};

export const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
});

export const authClient = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
  headers: { Authorization: `Bearer ${process.env.ADMIN_TOKEN}` },
});
