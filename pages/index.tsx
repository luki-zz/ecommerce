import { useGetProductsQuery } from "generated/graphql";
import { ProductsList } from "src/components/ProductList/ProductsList";
import { PageHeader } from "src/components/PageHeader/PageHeader";
import { useSession } from "next-auth/react";
import { NextSeo } from "next-seo";

export default function Home() {
  const { data, loading } = useGetProductsQuery();
  const { status, data: sessionData } = useSession();
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
      <NextSeo
        title="ComfySloth - shop page"
        description="Simple React/Next jest test store"
      />
      <PageHeader title={"Products"} />
      <p>{status}</p>
      <p>{JSON.stringify(sessionData)}</p>
      <div className="container">
        <ProductsList products={data?.products} />
      </div>
    </>
  );
}
