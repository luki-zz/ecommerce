import Image from "next/image";
import Link from "next/link";
import React from "react";
import style from "./Product.module.css";

export const Product = (props) => {
  const { name, slug, price, images } = props.product;
  return (
    <Link href={`products/${slug}`} className={style.productItem}>
      <Image
        src={images[0].url}
        alt={name}
        width={images[0].width}
        height={images[0].height}
      />
      <h2>{name}</h2>
      <p>{price}</p>
    </Link>
  );
};
