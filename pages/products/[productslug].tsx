import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Image from "next/image";
import { useGetProductQuery } from "generated/graphql";
import { Product } from "views/product/ProductView";

function ProductPage() {
  const router = useRouter();
  const { productslug } = router.query;

  if (typeof productslug !== "string" && router.isReady) {
    router.push("/404");
    return <></>;
  }
  if (typeof productslug === "string") {
    return <Product slug={productslug} />;
  }
}

export default ProductPage;
