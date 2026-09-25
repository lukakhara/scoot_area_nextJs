import ProductListingPage from "@/components/product-listing/ProductListingPage";

export default async function page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  return (
    <ProductListingPage
      pageType="parts"
      searchParams={resolvedSearchParams}
      locale={locale}
    />
  );
}
