import { gql, useQuery } from "@apollo/client";
import Link from "next/link";

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      name
      price
      slug
      id
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery<{
    products: {
      name: string;
      id: string;
      price: number;
      slug: string;
    }[];
  }>(GET_PRODUCTS);
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
