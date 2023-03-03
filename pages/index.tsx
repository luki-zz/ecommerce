import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useGetProductsQuery } from "generated/graphql";

export default function Home() {
  const { data, loading, error } = useGetProductsQuery();
  if (!data) return <p>Products not found</p>;
  return (
    <>
      {data.products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </li>
      ))}
    </>
  );
}
