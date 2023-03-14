import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  GetProductDocument,
  GetProductQueryResult,
  GetProductQueryVariables,
} from "generated/graphql";
import { Product } from "views/product/ProductView";
import { GetServerSidePropsContext } from "next";
import { client } from "apollo/apolloClients";

function ProductPage() {
  const router = useRouter();
  const { productslug } = router.query;

  if (typeof productslug !== "string" && router.isReady) {
    router.push("/404");
    return <></>;
  }
  if (typeof productslug === "string") {
    return <Product slug={productslug} />;
  }
}

export default ProductPage;

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const slug = params?.productslug;
  if (typeof slug !== "string") {
    return { notFound: true };
  }

  const product = await client.query<
    GetProductQueryResult,
    GetProductQueryVariables
  >({
    query: GetProductDocument,
    variables: { slug },
  });
  const { data } = product.data;

  if (!data?.product) {
    return { notFound: true };
  }

  return {
    props: { product: data?.product }, // will be passed to the page component as props
  };
}
