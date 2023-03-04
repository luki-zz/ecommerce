import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Image from "next/image";

const GET_PRODUCT = gql`
  query GetProduct($slug: String) {
    product(where: { slug: $slug }) {
      description
      name
      id
      slug
      price
      images {
        url
        width
        height
      }
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
      images: {
        url: string;
        width: number;
        height: number;
      }[];
    };
  }>(GET_PRODUCT, { variables: { slug: productlug } });

  if (loading) return <p>loading ...</p>;
  if (!data) return <p>Products not found</p>;
  const { name, description, price, images } = data.product;
  console.log(images[0].url);
  return (
    <div className="container">
      <main className="products_details">
        <h1>{name}</h1>
        <p>{description}</p>
        <p>{price}</p>
        <Image
          src={images[0].url}
          alt={name}
          width={images[0].width}
          height={images[0].height}
        />
      </main>
    </div>
  );
}

export default Product;
