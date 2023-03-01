import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const GET_PRODUCT = gql`
  query GetProduct($slug: String) {
    product(where: { slug: $slug }) {
      description
      name
      id
      slug
      price
    }
  }
`;

function Product() {
  const router = useRouter();
  const { productlug } = router.query;

  const { data, loading, error } = useQuery<{
    product: {
      name: string;
      id: string;
      slug: string;
      description: string;
      price: number;
    };
  }>(GET_PRODUCT, { variables: { slug: productlug } });

  if (loading) return <p>loading ...</p>;
  if (!data) return <p>Products not found</p>;
  const { name, description, price } = data.product;
  return (
    <>
      <h1>{name}</h1>
      <p>{description}</p>
      <p>{price}</p>
    </>
  );
}

export default Product;
