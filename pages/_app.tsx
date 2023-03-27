import "styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "apollo/apolloClients";
import Layout from "src/components/layout";
import { CartProvider } from "src/context/cart_context/CartContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <CartProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </ApolloProvider>
  );
}
