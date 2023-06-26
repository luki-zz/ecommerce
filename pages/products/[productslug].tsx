import React from "react";
import { Product } from "views/product/ProductView";
import { authClient } from "apollo/apolloClients";
import type { InferGetStaticPathsType } from "src/types/types";
import type { InferGetStaticPropsType } from "next";
import type {
  GetProductBySlugQuery,
  GetProductBySlugQueryVariables,
  GetSlugProductsQuery,
} from "generated/graphql";
import {
  GetSlugProductsDocument,
  GetProductBySlugDocument,
} from "generated/graphql";

export type ProductPageProps = InferGetStaticPropsType<typeof getStaticProps>;
function ProductPage(props: ProductPageProps) {
  return <Product product={props.product} />;
}

export default ProductPage;

export const getStaticPaths = async () => {
  const { data } = await authClient.query<GetSlugProductsQuery>({
    query: GetSlugProductsDocument,
  });
  return {
    paths: data.products.slice(0, 5).map(({ slug }) => ({
      params: {
        productSlug: slug,
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps = async ({
  params,
}: InferGetStaticPathsType<typeof getStaticPaths>) => {
  if (!params?.productSlug) {
    return {
      notFound: true,
    };
  }
  const { data } = await authClient.query<
    GetProductBySlugQuery,
    GetProductBySlugQueryVariables
  >({
    query: GetProductBySlugDocument,
    variables: { slug: params.productSlug },
  });

  if (data.product) {
    return {
      props: { product: data.product },
    };
  }
  return {
    notFound: true,
  };
};
