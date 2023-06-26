import React from "react";
import Image from "next/image";
import style from "./ProductView.module.css";
import { useCartContext } from "src/context/cart_context/CartContext";
import { PageHeader } from "src/components/PageHeader/PageHeader";
import type { ProductPageProps } from "pages/products/[productSlug]";

export function Product({ product }: ProductPageProps) {
  const { name, description, price, images, id } = product;

  const { addToCart } = useCartContext();

  return (
    <>
      <PageHeader title={name} />
      <div className="container">
        <main className={style.products_details}>
          <div className={style.col1}>
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
          </div>
          <div className={style.col2}>
            <h1 className={style.productTitle}>{name}</h1>
            <h5 className={style.price}>${price}</h5>
            <p className={style.productDescription}>{description}</p>
            <button
              className={style.addToCart}
              onClick={() =>
                addToCart({
                  id,
                  name,
                  price,
                  image: {
                    url: images[0].url,
                    width: images[0].width ?? 0,
                    height: images[0].height ?? 0,
                  },
                })
              }
            >
              Add To Cart
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
