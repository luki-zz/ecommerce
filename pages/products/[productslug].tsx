import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Image from "next/image";
import { GetProductDocument } from "generated/graphql";
import type {
  GetProductQueryResult,
  GetProductQueryVariables,
} from "generated/graphql";
import { Product } from "views/product/ProductView";
import type { GetServerSidePropsContext } from "next";
import { client } from "apollo/apolloClients";
import { NextSeo } from "next-seo";

function ProductPage(props) {
  return (
    <>
      <NextSeo title={`${props.product.name} - ComfySloth shop`} />
      <Product product={props.product} />
    </>
  );
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
  const { data } = product;

  if (!data.product) {
    return { notFound: true };
  }

  return {
    props: { product: data.product }, // will be passed to the page component as props
  };
}
