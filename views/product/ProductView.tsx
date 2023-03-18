import React from "react";
import Image from "next/image";
import { useGetProductQuery } from "generated/graphql";
import { GetServerSidePropsContext } from "next/types";

export function Product({ product }) {
  const { name, description, price, images } = product;

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
