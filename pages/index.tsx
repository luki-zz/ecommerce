import Link from "next/link";
import { useGetProductsQuery } from "generated/graphql";
import { ProductsList } from "src/components/ProductList/ProductsList";

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
      <ProductsList products={data.products} />
    </div>
  );
}
