import ProductListingPage from "@/components/product-listing/ProductListingPage";

export default async function page({
  searchParams,
  params,
}: {
  searchParams: Promise<{[key: string]: string  | string[] | undefined;}>;
  params:Promise<{locale:string}>;
}) {
  const query = await searchParams;
  const {locale} = await params;
  return <ProductListingPage pageType="scooters" searchParams = {query} locale={locale} />;
}
