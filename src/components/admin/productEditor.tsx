"use client";
import { useState } from "react";
import { ImagePlus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  commonFields,
  modelFields,
  sampleScooters,
  type ProductField,
  type ProductKind,
  type ProductRow,
} from "./productFields";

function EditorField({
  field,
  value,
}: {
  field: ProductField;
  value?: string | undefined;
}) {
  const classes =
    "h-11 w-full min-w-0 rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15";
  if (field.type === "checkbox")
    return (
      <label className="flex min-h-11 items-center gap-3 text-sm">
        <input
          type="checkbox"
          name={field.key}
          defaultChecked={value === "true"}
          className="size-4 accent-primary"
        />
        {field.label}
      </label>
    );
  return (
    <label className="block min-w-0">
      <span className="mb-2 block text-xs font-semibold text-muted-foreground">
        {field.label}
      </span>
      {field.options ? (
        <select
          aria-label={field.label}
          name={field.key}
          defaultValue={value || ""}
          className={classes}
        >
          <option value="">—</option>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          name={field.key}
          type={field.type || "text"}
          defaultValue={value}
          readOnly={field.readOnly}
          step={field.type === "number" ? "any" : undefined}
          className={classes}
        />
      )}
    </label>
  );
}

export function ProductEditor({
  kind,
  product,
  open,
  onClose,
}: {
  kind: ProductKind;
  product?: ProductRow | undefined;
  open: boolean;
  onClose: () => void;
}) {
  const [locale, setLocale] = useState<"ka" | "en">("ka");
  const values: Record<string, string> = product
    ? { ...product.values, price: product.price, stock: product.stock }
    : {};
  const compatibilityKey =
    kind === "part" ? "compatibleModels" : "compatibleWith";
  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose();
      }}
    >
      <DialogContent className="flex max-h-[90dvh] w-[calc(100%_-_2rem)] max-w-4xl flex-col gap-0 overflow-hidden rounded-lg p-0">
        <div className="border-b px-5 py-5 sm:px-7">
          <DialogTitle className="pr-7">
            {product ? "პროდუქტის რედაქტირება" : "პროდუქტის დამატება"}
          </DialogTitle>
          <DialogDescription className="mt-2">
            {kind === "scooter"
              ? "სკუტერი"
              : kind === "accessory"
                ? "აქსესუარი"
                : "სათადარიგო ნაწილი"}
          </DialogDescription>
        </div>
        <form
          id="product-editor"
          onSubmit={(event) => event.preventDefault()}
          className="min-h-0 overflow-y-auto px-5 py-6 sm:px-7"
        >
          <fieldset>
            <legend className="mb-4 font-bold">ძირითადი ინფორმაცია</legend>
            <div className="grid gap-5 sm:grid-cols-2">
              {modelFields[kind]
                .slice(0, kind === "scooter" ? 2 : undefined)
                .map((field) => (
                  <EditorField
                    key={field.key}
                    field={field}
                    value={values[field.key]}
                  />
                ))}
            </div>
          </fieldset>
          {kind !== "scooter" && (
            <fieldset className="mt-7 border-t pt-6">
              <legend className="sr-only">თარგმანები</legend>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-bold">თარგმანები</h3>
                <div className="flex gap-1 rounded-md bg-secondary p-1">
                  {(["ka", "en"] as const).map((lang) => (
                    <Button
                      type="button"
                      key={lang}
                      variant={locale === lang ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setLocale(lang)}
                      aria-pressed={locale === lang}
                    >
                      {lang === "ka" ? "ქართული" : "English"}
                    </Button>
                  ))}
                </div>
              </div>
              {(["ka", "en"] as const).map((lang) => (
                <div key={lang} hidden={locale !== lang}>
                  <EditorField
                    field={{
                      key: `name_${lang}`,
                      label: lang === "ka" ? "სახელი (KA)" : "Name (EN)",
                    }}
                    value={values[`name_${lang}`]}
                  />
                  <label className="mt-4 block text-xs font-semibold text-muted-foreground">
                    {lang === "ka" ? "აღწერა (KA)" : "Description (EN)"}
                    <textarea
                      name={`description_${lang}`}
                      defaultValue={values[`description_${lang}`]}
                      rows={3}
                      className="mt-2 w-full rounded-md border bg-background p-3 text-sm text-foreground outline-none focus:border-primary"
                    />
                  </label>
                </div>
              ))}
            </fieldset>
          )}
          <fieldset className="mt-7 border-t pt-6">
            <legend className="sr-only">ფასი და მარაგი</legend>
            <h3 className="mb-4 font-bold">ფასი და მარაგი</h3>
            <div className="grid gap-5 sm:grid-cols-2">
              {commonFields.map((field) => (
                <EditorField
                  key={field.key}
                  field={field}
                  value={values[field.key]}
                />
              ))}
            </div>
          </fieldset>
          {kind === "scooter" && (
            <fieldset className="mt-7 border-t pt-6">
              <legend className="sr-only">ტექნიკური მახასიათებლები</legend>
              <h3 className="mb-4 font-bold">ტექნიკური მახასიათებლები</h3>
              <div className="grid gap-5 sm:grid-cols-2">
                {modelFields.scooter.slice(2).map((field) => (
                  <EditorField
                    key={field.key}
                    field={field}
                    value={values[field.key]}
                  />
                ))}
              </div>
            </fieldset>
          )}
          <fieldset className="mt-7 border-t pt-6">
            <legend className="sr-only">სურათები</legend>
            <h3 className="mb-4 font-bold">სურათები</h3>
            <div className="mb-4 grid h-28 place-items-center rounded-md border border-dashed bg-secondary">
              <ImagePlus className="size-8 text-muted-foreground" />
            </div>
            <label className="block text-xs font-semibold text-muted-foreground">
              სურათების ბმულები
              <textarea
                name="images"
                rows={3}
                defaultValue={values["images"]}
                placeholder="https://…"
                className="mt-2 w-full rounded-md border bg-background p-3 text-sm text-foreground outline-none focus:border-primary"
              />
            </label>
          </fieldset>
          {kind !== "scooter" && (
            <fieldset className="mt-7 border-t pt-6">
              <legend className="sr-only">თავსებადობა</legend>
              <h3 className="mb-4 font-bold">თავსებადი სკუტერები</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {sampleScooters.map((scooter) => (
                  <label
                    key={scooter.id}
                    className="flex items-center gap-3 rounded-md border p-3 text-sm"
                  >
                    <input
                      type="checkbox"
                      name={compatibilityKey}
                      value={scooter.id}
                      defaultChecked={values[compatibilityKey]
                        ?.split(",")
                        .includes(scooter.id)}
                      className="size-4 accent-primary"
                    />
                    {scooter.name}
                  </label>
                ))}
              </div>
              {kind === "accessory" && (
                <label className="mt-4 block text-xs text-muted-foreground">
                  სხვა მოდელების ID / სახელები
                  <input
                    name="compatibleWithExtra"
                    className="mt-2 h-11 w-full rounded-md border bg-background px-3 text-sm text-foreground"
                  />
                </label>
              )}
            </fieldset>
          )}
          {product && (
            <details className="mt-7 border-t pt-5 text-sm">
              <summary className="cursor-pointer text-muted-foreground">
                სისტემური ინფორმაცია
              </summary>
              <dl className="mt-3 grid gap-2 text-xs">
                <div>
                  <dt className="text-muted-foreground">ID</dt>
                  <dd>{product.id}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">შექმნის თარიღი</dt>
                  <dd>—</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">განახლების თარიღი</dt>
                  <dd>—</dd>
                </div>
              </dl>
            </details>
          )}
        </form>
        <div className="flex justify-end gap-3 border-t bg-secondary px-5 py-4 sm:px-7">
          <Button variant="outline" type="button" onClick={onClose}>
            გაუქმება
          </Button>
          <Button disabled type="button">
            <Save />
            შენახვა
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
