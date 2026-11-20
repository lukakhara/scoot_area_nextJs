"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  ArrowLeft,
  Bike,
  Package,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductEditor } from "@/components/admin/productEditor";
import {
  kinds,
  type ProductKind,
  type ProductRow,
} from "@/components/admin/productFields";
import {
  useAdminProducts,
  useProductCounts,
} from "@/components/admin/useAdminProducts";

import Link from "next/link";
import ProductCardImage from "@/components/ui/ProductCardImage";

const kindKeys = kinds.map((item) => item.key);

export default function AdminPage() {
  const t = useTranslations("AdminPage");
  const [kind, setKind] = useState<ProductKind>("scooter");
  const [search, setSearch] = useState("");
  const [editor, setEditor] = useState<{ product?: ProductRow } | null>(null);
  const [deleting, setDeleting] = useState<ProductRow | null>(null);
  const [countsKey, setCountsKey] = useState(0);

  const { rows, loading, error, reload } = useAdminProducts(kind, search);
  const counts = useProductCounts(kindKeys, countsKey);

  const refresh = () => {
    reload();
    setCountsKey((v) => v + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b-2 border-primary bg-brand-ink text-primary-foreground">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Link href="/" className="text-2xl font-extrabold">
            sco<span className="text-primary">o</span>area
          </Link>
          <div className="flex items-center gap-2 text-xs">
            <ShieldCheck className="size-4 text-sale" />
            <span>{t("role")}</span>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8 sm:py-12">
        <Button
          variant="link"
          nativeButton={false}
          render={<Link href="/" />}
          className="mb-6 h-auto p-0 text-muted-foreground cursor-pointer"
        >
          <ArrowLeft />
          {t("backToStore")}
        </Button>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-2 text-xs font-bold uppercase text-sale">
              {t("eyebrow")}
            </div>
            <h1 className="text-2xl font-extrabold sm:text-3xl">
              {t("title")}
            </h1>
          </div>
          <Button onClick={() => setEditor({})} className="h-11 cursor-pointer">
            <Plus />
            {t("addProduct")}
          </Button>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 border-b pb-5 lg:flex-row lg:items-center">
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label={t("productTypeLabel")}
          >
            {kinds.map((item) => (
              <Button
                key={item.key}
                role="tab"
                aria-selected={kind === item.key}
                variant={kind === item.key ? "default" : "secondary"}
                onClick={() => {
                  setKind(item.key);
                  setSearch("");
                }}
                className="h-auto min-h-10 whitespace-normal py-2 text-left cursor-pointer"
              >
                {item.key === "scooter" ? <Bike /> : <Package />}
                {item.label}
                <span className="opacity-70">{counts[item.key] ?? "–"}</span>
              </Button>
            ))}
          </div>
          <label className="relative block lg:w-72">
            <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
            <input
              aria-label={t("searchPlaceholder")}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t("searchPlaceholder")}
              className="h-10 w-full rounded-md border bg-background pl-10 pr-3 text-sm outline-none focus:border-primary"
            />
          </label>
        </div>
        <div className="mt-5 flex justify-between text-xs text-muted-foreground">
          <span>{t("productCount", { count: rows.length })}</span>
          <span>{t("currencyNote")}</span>
        </div>
        <div className="mt-4 overflow-x-auto rounded-lg border">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-secondary text-xs text-muted-foreground">
              <tr>
                {[
                  t("table.product"),
                  kind === "part" ? t("table.sku") : t("table.brand"),
                  t("table.category"),
                  t("table.price"),
                  t("table.stock"),
                  t("table.actions"),
                ].map((label) => (
                  <th key={label} className="px-5 py-4 font-semibold">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={loading ? "opacity-50" : undefined}>
              {rows.map((row) => (
                <tr key={row.id} className="border-t">
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-3">
                      <div className="relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-md bg-secondary">
                        {row.image ? (
                          <ProductCardImage
                            src={row.image}
                            alt={row.name}
                            width={96}
                            height={96}
                          />
                        ) : (
                          <Package className="size-5 text-muted-foreground" />
                        )}
                      </div>

                      <div>
                        <div className="font-semibold">{row.name}</div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {row.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5">
                    {kind === "part" ? row.values["sku"] : row.brand}
                  </td>
                  <td className="max-w-52 break-words px-5 py-5 text-xs text-muted-foreground">
                    {/* {row.category.replaceAll("_", " ")} */}
                  </td>
                  <td className="whitespace-nowrap px-5 py-5 font-bold">
                    {row.price}₾
                    {row.values["discountPrice"] && (
                      <div className="mt-1 text-xs text-sale">
                        {row.values["discountPrice"]}₾
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-5">
                    <span
                      className={
                        Number(row.stock)
                          ? "text-sale"
                          : "text-muted-foreground"
                      }
                    >
                      {row.stock}
                    </span>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={t("editAria", { name: row.name })}
                        title={t("edit")}
                        onClick={() => setEditor({ product: row })}
                        className="cursor-pointer"
                      >
                        <Pencil />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive cursor-pointer"
                        aria-label={t("deleteAria", { name: row.name })}
                        title={t("delete")}
                        onClick={() => setDeleting(row)}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && rows.length === 0 && (
            <div className="py-16 text-center text-sm text-muted-foreground">
              {t("loading")}
            </div>
          )}
          {error && (
            <div className="flex flex-col items-center gap-3 py-16 text-center text-sm text-destructive">
              {t("loadError")}
              <Button variant="outline" onClick={reload}>
                {t("retry")}
              </Button>
            </div>
          )}
          {!loading && !error && rows.length === 0 && (
            <div className="py-16 text-center text-sm text-muted-foreground">
              {t("noProducts")}
            </div>
          )}
        </div>
      </main>
      {editor && (
        <ProductEditor
          key={`${kind}-${editor.product?.id || "new"}`}
          kind={kind}
          product={editor.product}
          open
          onClose={() => {
            setEditor(null);
            refresh();
          }}
        />
      )}
      <Dialog
        open={Boolean(deleting)}
        onOpenChange={(value) => {
          if (!value) setDeleting(null);
        }}
      >
        <DialogContent className="w-[calc(100%_-_2rem)] rounded-lg">
          <DialogTitle>{t("deleteDialogTitle")}</DialogTitle>
          <DialogDescription>{deleting?.name}</DialogDescription>
          <div className="mt-4 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDeleting(null)}>
              {t("cancel")}
            </Button>
            <Button variant="destructive" disabled>
              <Trash2 />
              {t("delete")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
