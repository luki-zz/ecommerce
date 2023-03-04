import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useGetProductsQuery } from "generated/graphql";

export default function Home() {
  const { data, loading, error } = useGetProductsQuery();
  if (!data)
    return (
      <div className="container">
        <p>Products not found</p>
      </div>
    );
  return (
    <div className="container">
      {data.products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </li>
      ))}
    </div>
  );
}
