import Link from "next/link";
import { useGetProductsQuery } from "generated/graphql";
import { ProductsList } from "src/components/ProductList/ProductsList";
import { PageHeader } from "src/components/PageHeader/PageHeader";

export default function Home() {
  const { data, loading, error } = useGetProductsQuery();
  if (loading)
    return (
      <div className="container">
        <p>Loading</p>
      </div>
    );
  if (!data && !loading)
    return (
      <div className="container">
        <p>Products not found</p>
      </div>
    );
  return (
    <>
      <PageHeader title={"Products"} />
      <div className="container">
        <ProductsList products={data?.products} />
      </div>
    </>
  );
}
