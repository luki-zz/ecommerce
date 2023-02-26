import { gql, useQuery } from "@apollo/client";

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
    name: string;
    id: string;
    price: number;
    slug: string;
  }>(GET_PRODUCTS);
  if (!data) return <p>Products not found</p>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
