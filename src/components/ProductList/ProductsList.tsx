import React from "react";
import style from "./ProductList.module.css";
import Image from "next/image";
import Link from "next/link";
import type { GetProductsQuery } from "generated/graphql";

export const ProductsList = ({
  products,
}: {
  products: GetProductsQuery["products"] | undefined;
}) => {
  return (
    <ul className={style.productsList}>
      {products?.map(({ name, price, id, images, slug }) => {
        const productProps = {
          name,
          price,
          id,
          slug,
          image: {
            width: Number(images[0].width),
            height: Number(images[0].height),
            src: images[0].url,
          },
        };
        return <Product key={id} {...productProps} />;
      })}
    </ul>
  );
};

type ProductType = {
  name: string;
  slug: string;
  id: string;
  price: number;
  image: { width: number; height: number; src: string };
};

export const Product = ({ name, slug, price, image }: ProductType) => {
  return (
    <Link href={`products/${slug}`} className={style.productItem}>
      <Image alt={name} {...image} />
      <h2>{name}</h2>
      <p>{price}</p>
    </Link>
  );
};
