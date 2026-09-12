import React from "react";
import ProductListingPage from "@/components/product-listing/ProductListingPage";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  const params = await searchParams;
  return <ProductListingPage pageType="accessories" searchParams={params} />;
}
