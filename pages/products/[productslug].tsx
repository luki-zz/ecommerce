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
