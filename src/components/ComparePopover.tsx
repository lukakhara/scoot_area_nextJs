"use client";

import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { ArrowLeftRight, Check, X } from "lucide-react";
import { useTranslations } from "next-intl";

export type CompareProduct = {
  id: string;
  name: string;
  price: string;
  image: string;
};

type ComparePopoverProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  products: CompareProduct[];
  selected: string[];
  onToggle: (id: string) => void;
};

const ROW_GRID =
  "grid grid-cols-[1fr_auto_auto] items-center gap-3 md:grid-cols-[1fr_200px_220px] md:gap-6";

export default function ComparePopover({
  open,
  onOpenChange,
  products,
  selected,
  onToggle,
}: ComparePopoverProps) {
  const t = useTranslations("compare")
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [open, onOpenChange]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/55 px-4 pt-6 pb-6 md:pt-[38px] md:pb-[34px]"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onOpenChange(false);
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="flex max-h-full w-full max-w-[1423px] flex-col overflow-hidden rounded-xl bg-white shadow-2xl outline-none"
      >
        {/* Header */}
        <header className="flex items-center justify-between border-b border-neutral-200 px-5 py-5">
          <h2
            id={titleId}
            className="text-lg font-bold uppercase text-[#212121] md:text-xl"
          >
            {t("popoverTitle")}
          </h2>
          <button
            type="button"
            aria-label={t("close")}
            onClick={() => onOpenChange(false)}
            className="flex size-9 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:text-neutral-900 cursor-pointer"
          >
            <X className="size-7" strokeWidth={1.5} />
          </button>
        </header>

        {/* Scrollable body */}
        <div className="min-h-0 flex-1 overflow-y-auto px-5 [scrollbar-width:thin]">
          {/* Column headings */}
          <div
            className={`${ROW_GRID} border-b border-neutral-300 px-4 py-9 text-base font-semibold uppercase text-[#212121]`}
          >
            <span>{t("product")}</span>
            <span>{t("price")}</span>
            <span className="md:w-auto">{t('add')}</span>
          </div>

          {/* Rows */}
          {products.map((product) => {
            const active = selected.includes(product.id);

            return (
              <div
                key={product.id}
                className={`${ROW_GRID} border-b border-neutral-300 px-4 py-5 last:border-b-0`}
              >
                <div className="flex min-w-0 items-center gap-5">
                  <div className="flex size-[88px] shrink-0 items-center justify-center rounded-2xl bg-white p-2 shadow-[0_2px_12px_rgba(0,0,0,0.12)] md:size-[125px]">
                    {product.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.image}
                        alt={product.name}
                        className="size-full object-contain"
                      />
                    ) : null}
                  </div>
                  <strong className="truncate text-base font-bold uppercase text-[#212121] md:text-xl">
                    {product.name}
                  </strong>
                </div>

                <strong className="whitespace-nowrap text-base font-bold text-[#212121] md:text-xl">
                  {product.price}
                </strong>

                <div>
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => onToggle(product.id)}
                    className={`inline-flex h-10 items-center gap-2 rounded-full border px-5 text-sm font-medium transition-colors md:px-6 cursor-pointer ${
                      active
                        ? "border-[#E8610A] text-[#E8610A] hover:bg-[#E8610A] hover:text-white"
                        : "border-[#212121] text-[#212121] hover:border-[#E8610A] hover:text-[#E8610A]"
                    }`}
                  >
                    {active ? (
                      <Check className="size-4" />
                    ) : (
                      <ArrowLeftRight className="size-4" />
                    )}
                    <span>{active ? t("added") : t("compare")}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <footer className="flex justify-end border-t border-neutral-200 px-5 py-5">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-md bg-[#B98A5E] px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 cursor-pointer"
          >
            {t("close")}
          </button>
        </footer>
      </div>
    </div>,
    document.body,
  );
}