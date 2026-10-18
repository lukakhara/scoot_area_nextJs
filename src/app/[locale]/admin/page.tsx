'use client'
import { useState } from "react";
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
  sampleRows,
  type ProductKind,
  type ProductRow,
} from "@/components/admin/productFields";

import Link from "next/link";

export default function AdminPage() {
  const [kind, setKind] = useState<ProductKind>("scooter");
  const [search, setSearch] = useState("");
  const [editor, setEditor] = useState<{ product?: ProductRow } | null>(null);
  const [deleting, setDeleting] = useState<ProductRow | null>(null);
  const rows = sampleRows[kind].filter((row) =>
    `${row.name} ${row.brand} ${row.values["sku"] || ""}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b-2 border-primary bg-brand-ink text-primary-foreground">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Link href="/" className="text-2xl font-extrabold">
            sco<span className="text-primary">o</span>area
          </Link>
          <div className="flex items-center gap-2 text-xs">
            <ShieldCheck className="size-4 text-sale" />
            <span>ადმინისტრატორი</span>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8 sm:py-12">
        <Button
          
          variant="link"
          className="mb-6 h-auto p-0 text-muted-foreground"
        >
          <Link href="/">
            <ArrowLeft />
            მაღაზიაში დაბრუნება
          </Link>
        </Button>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-2 text-xs font-bold uppercase text-sale">
              Scootarea / Admin
            </div>
            <h1 className="text-2xl font-extrabold sm:text-3xl">პროდუქტები</h1>
          </div>
          <Button onClick={() => setEditor({})} className="h-11">
            <Plus />
            პროდუქტის დამატება
          </Button>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 border-b pb-5 lg:flex-row lg:items-center">
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="პროდუქტის ტიპი"
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
                className="h-auto min-h-10 whitespace-normal py-2 text-left"
              >
                {item.key === "scooter" ? <Bike /> : <Package />}
                {item.label}
                <span className="opacity-70">
                  {sampleRows[item.key].length}
                </span>
              </Button>
            ))}
          </div>
          <label className="relative block lg:w-72">
            <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
            <input
              aria-label="პროდუქტის ძებნა"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="პროდუქტის ძებნა"
              className="h-10 w-full rounded-md border bg-background pl-10 pr-3 text-sm outline-none focus:border-primary"
            />
          </label>
        </div>
        <div className="mt-5 flex justify-between text-xs text-muted-foreground">
          <span>{rows.length} პროდუქტი</span>
          <span>ფასი — ₾</span>
        </div>
        <div className="mt-4 overflow-x-auto rounded-lg border">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-secondary text-xs text-muted-foreground">
              <tr>
                {[
                  "პროდუქტი",
                  kind === "part" ? "SKU" : "ბრენდი",
                  "კატეგორია",
                  "ფასი",
                  "მარაგი",
                  "მოქმედება",
                ].map((label) => (
                  <th key={label} className="px-5 py-4 font-semibold">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t">
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-3">
                      <div className="grid size-12 shrink-0 place-items-center rounded-md bg-secondary">
                        <Package className="size-5 text-muted-foreground" />
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
                    {row.category.replaceAll("_", " ")}
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
                        aria-label={`${row.name} — რედაქტირება`}
                        title="რედაქტირება"
                        onClick={() => setEditor({ product: row })}
                      >
                        <Pencil />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        aria-label={`${row.name} — წაშლა`}
                        title="წაშლა"
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
          {rows.length === 0 && (
            <div className="py-16 text-center text-sm text-muted-foreground">
              პროდუქტი ვერ მოიძებნა
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
          onClose={() => setEditor(null)}
        />
      )}
      <Dialog
        open={Boolean(deleting)}
        onOpenChange={(value) => {
          if (!value) setDeleting(null);
        }}
      >
        <DialogContent className="w-[calc(100%_-_2rem)] rounded-lg">
          <DialogTitle>პროდუქტის წაშლა</DialogTitle>
          <DialogDescription>{deleting?.name}</DialogDescription>
          <div className="mt-4 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDeleting(null)}>
              გაუქმება
            </Button>
            <Button variant="destructive" disabled>
              <Trash2 />
              წაშლა
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
