import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Image from "next/image";
import { useGetProductQuery } from "generated/graphql";

function Product() {
  const router = useRouter();
  const { productslug } = router.query;

  const { data, loading, error } = useGetProductQuery({
    variables: { slug: productslug },
  });

  if (loading)
    return (
      <div className="container">
        <p>loading ...</p>
      </div>
    );
  if (!data)
    return (
      <div className="container">
        <p>Product not found</p>
      </div>
    );
  const { name, description, price, images } = data.product;

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
