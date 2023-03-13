import React from "react";
import Image from "next/image";
import { useGetProductQuery } from "generated/graphql";

export function Product({ slug }: { slug: string }) {
  const { data, loading, error } = useGetProductQuery({
    variables: { slug },
  });

  if (loading)
    return (
      <div className="container">
        <p>loading ...</p>
      </div>
    );
  if (!data?.product)
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
        {images[0].width && images[0].height ? (
          <Image
            src={images[0].url}
            alt={name}
            width={images[0].width}
            height={images[0].height}
          />
        ) : (
          <></>
        )}
      </main>
    </div>
  );
}
