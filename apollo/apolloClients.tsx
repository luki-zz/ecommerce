import { ApolloClient, InMemoryCache } from "@apollo/client";
const API_URL = process.env.NEXT_PUBILIC_HYGRAPH_API;

export const client = new ApolloClient({
  uri: "https://api-eu-west-2.hygraph.com/v2/cleityuh0096q01tadtcog76x/master",
  cache: new InMemoryCache(),
});
