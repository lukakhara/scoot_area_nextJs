"use client";
import { useEffect, useState } from "react";
import { ChevronDown, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import type { ProductType } from "@/types/product";
import type { ApiProduct, CartItem } from "@/types/cart";
import { cn } from "@/lib/utils";
import { API_URL } from "@/lib/config";


const DELIVERY_FEE = 50;
const FREE_DELIVERY_FROM = 1500;

type Delivery = "DELIVERY" | "STORE_PICKUP";

const PRODUCT_ENDPOINTS: Record<ProductType, string> = {
  scooter: "scooters",
  accessory: "accessories",
  parts: "parts",
};

interface CheckoutForm {
  city: string;
  street: string;
  comment: string;
  firstName: string;
  lastName: string;
  phone: string;
  acceptedTerms: boolean;
  email: string;
}

const emptyForm: CheckoutForm = {
  city: "თბილისი",
  street: "",
  comment: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  acceptedTerms: false,
};

const cartKey = (item: Pick<CartItem, "productType" | "productId">) =>
  `${item.productType}:${item.productId}`;

const unitPrice = (p: ApiProduct) => Number(p.discountPrice ?? p.price);
const fullPrice = (p: ApiProduct) =>
  p.discountPrice != null ? Number(p.price) : null;

function CartPage() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const hasHydrated = useCartStore((state) => state.hasHydrated);

  const [products, setProducts] = useState<Record<string, ApiProduct>>({});
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState(false);

  const [delivery, setDelivery] = useState<Delivery>("DELIVERY");
  const [isOrdersPlaced, setIsOrdersPlaced] = useState(false);
  const [form, setForm] = useState<CheckoutForm>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  // changes only when a product is added/removed, not when quantity changes
  const itemsKey = items.map(cartKey).sort().join(",");

  console.log('form',form);
  const lines = items.map((item) => ({
    item,
    product: products[cartKey(item)],
  }));

  const hasUnavailable =
    !loadingProducts && !productsError && lines.some((l) => !l.product);
  const canCheckout = !loadingProducts && !productsError && !hasUnavailable;

  const subtotal = lines.reduce(
    (sum, { item, product }) =>
      sum + (product ? unitPrice(product) * item.quantity : 0),
    0,
  );
  const discount = lines.reduce((sum, { item, product }) => {
    const old = product ? fullPrice(product) : null;
    return (
      sum + (product && old ? (old - unitPrice(product)) * item.quantity : 0)
    );
  }, 0);
  const deliveryFee =
    delivery === "DELIVERY" && subtotal < FREE_DELIVERY_FROM && subtotal > 0
      ? DELIVERY_FEE
      : 0;
  const total = subtotal + deliveryFee;

  const format = (n: number) => `${n.toFixed(2)}₾`;

  const setField = <K extends keyof CheckoutForm>(
    key: K,
    value: CheckoutForm[K],
  ) => setForm((prev) => ({ ...prev, [key]: value }));

  const setQty = (item: CartItem, delta: number) => {
    updateQuantity(
      item.productType,
      item.productId,
      Math.max(1, item.quantity + delta),
    );
  };

  // load each cart product by type + id
  useEffect(() => {
    if (!hasHydrated) return;
    if (items.length === 0) {
      setProducts({});
      setLoadingProducts(false);
      return;
    }

    const controller = new AbortController();
    setLoadingProducts(true);
    setProductsError(false);

    (async () => {
      try {
        const results = await Promise.all(
          items.map(async (item) => {
            const res = await fetch(
              `${API_URL}/${PRODUCT_ENDPOINTS[item.productType]}/${item.productId}`,
              { signal: controller.signal },
            );

            if (res.status === 404) return null; // product no longer exists
            if (!res.ok) throw new Error("Failed to load product");

            const json = await res.json();
            const data: ApiProduct = json.data ?? json;
            return [cartKey(item), data] as const;
          }),
        );

        setProducts(
          Object.fromEntries(
            results.filter(
              (r): r is readonly [string, ApiProduct] => r !== null,
            ),
          ),
        );
      } catch {
        if (!controller.signal.aborted) setProductsError(true);
      } finally {
        if (!controller.signal.aborted) setLoadingProducts(false);
      }
    })();

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasHydrated, itemsKey]);

  // prefill from the logged-in user when checkout opens
  useEffect(() => {
    if (!isOrdersPlaced) return;
    const controller = new AbortController();

    (async () => {
      try {
        const res = await fetch(`${API_URL}/auth/me`, {
          credentials: "include",
          signal: controller.signal,
        });
        if (!res.ok) return;
        const data = await res.json();
        const user = data.user ?? data;
        setForm((prev) => ({
          ...prev,
          firstName: prev.firstName || user.firstName || "",
          lastName: prev.lastName || user.lastName || "",
          phone: prev.phone || user.phone || "",
          email: prev.email || user?.email || "",
        }));
      } catch {
        // not logged in or aborted — user fills the form manually
      }
    })();

    return () => controller.abort();
  }, [isOrdersPlaced]);

  // prefill from the logged-in user when checkout opens
  useEffect(() => {
    if (!isOrdersPlaced) return;
    const controller = new AbortController();

    (async () => {
      try {
        const res = await fetch(`${API_URL}/address`, {
          credentials: "include",
          signal: controller.signal,
        });
        if (!res.ok) return;
        const { data } = await res.json();
        const user = data.user ?? data;
        const defaultAddress = user.find((a) => a.isDefault === true);
        setForm((prev) => ({
          ...prev,
          city: prev.city || defaultAddress?.city || "",
          street: prev.street || defaultAddress?.street || "",
        }));
      } catch {
        // not logged in or aborted — user fills the form manually
      }
    })();

    return () => controller.abort();
  }, [isOrdersPlaced]);

  const validate = (): string | null => {
    if (!canCheckout) return "კალათის მონაცემები ვერ ჩაიტვირთა";
    if (!form.firstName.trim() || !form.lastName.trim())
      return "მიუთითეთ სახელი და გვარი";
    if (!form.phone.trim()) return "მიუთითეთ ტელეფონის ნომერი";
    if (delivery === "DELIVERY" && !form.city.trim() && !form.street.trim()) {
      return "მიუთითეთ ქალაქი და ქუჩა";
    }
    if (!form.acceptedTerms) return "დაეთანხმეთ წესებსა და პირობებს";
    return null;
  };

  const common = {
    customerFirstName: form.firstName.trim(),
    customerLastName: form.lastName.trim(),
    customerPhone: form.phone.trim(),
    customerEmail: form.email.trim(),
    comment: form.comment.trim() || undefined,
    items: items.map((item) => ({
      productType: item.productType.toLocaleUpperCase(),
      productId: item.productId,
      quantity: item.quantity,
    })),
  };

  const payload =
    delivery === "DELIVERY"
      ? {
          ...common,
          delivery: "DELIVERY" as const,
          city: form.city,
          street: form.street.trim(),
        }
      : {
          ...common,
          delivery: "STORE_PICKUP" as const,
        };

  const placeOrder = async () => {
    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 401) {
        setError("შეკვეთისთვის გთხოვთ გაიაროთ ავტორიზაცია");
        return;
      }

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(data?.message ?? "შეკვეთის განთავსება ვერ მოხერხდა");
        return;
      }

      setOrderId(data?.id ?? data?.order?.id ?? "");
      clearCart();
    } catch {
      setError("კავშირის შეცდომა, სცადეთ თავიდან");
    } finally {
      setSubmitting(false);
    }
  };

  if (!hasHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">იტვირთება...</p>
      </div>
    );
  }

  if (orderId !== null) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-2 px-5 text-center">
        <h1 className="text-2xl font-bold uppercase">შეკვეთა მიღებულია</h1>
        {orderId && (
          <p className="text-muted-foreground text-sm">
            შეკვეთის ნომერი: {orderId}
          </p>
        )}
      </div>
    );
  }

  console.log(emptyForm);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center w-full md:pt-20 md:pb-30 md:px-[75px] px-5 pt-8">
      <main className="w-full">
        <h1 className="text-[24px] font-bold tracking-tight uppercase sm:text-4xl">
          კალათა
        </h1>

        <div className="mt-6 gap-8 flex flex-col md:flex-row">
          {/* Items */}
          <section className="overflow-hidden rounded-2xl border bg-card w-[70%] border-[#888888]!">
            <div className="grid grid-cols-[1fr_90px_80px_90px_44px] items-center gap-2 border-b-[0.5px] px-4 py-4 text-[9px] tracking-wide uppercase sm:px-6 sm:text-sm text-[#212121] md:text-[22px] border-[#888888]">
              <span>პროდუქტი</span>
              <span>ფასი</span>
              <span>ცალი</span>
              <span>ჯამი</span>
              <span />
            </div>

            {lines.map(({ item, product }) => {
              const old = product ? fullPrice(product) : null;

              return (
                <div
                  key={cartKey(item)}
                  className="grid grid-cols-[1fr_90px_80px_90px_44px] items-center gap-2 border-b px-4 py-4 last:border-b-0 sm:px-6 w-full text-[#5A5A5A] border-[#888888] text-[7.9px] md:text-[18px]"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={product?.images?.[0] ?? "/scooterMobile.png"}
                      className="hidden size-32 shrink-0 rounded-xl border sm:flex bg-cover"
                      alt={product?.name ?? ""}
                      width={128}
                      height={128}
                    />

                    <div className="min-w-0">
                      {product ? (
                        <>
                          <p className="leading-[100%] md:leading-tight font-extrabold uppercase text-[#212121]">
                            {product.name}
                          </p>
                          {product.color && (
                            <p className="mt-1">ფერი: {product.color}</p>
                          )}
                        </>
                      ) : loadingProducts ? (
                        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                      ) : (
                        <p className="text-[#EA2700]">პროდუქტი მიუწვდომელია</p>
                      )}
                    </div>
                  </div>

                  <div className="text-[11px] sm:text-sm font-normal">
                    {old && (
                      <p className="text-muted-foreground line-through">
                        {format(old)}
                      </p>
                    )}
                    {product && (
                      <p className={old ? "text-[#EA2700]" : ""}>
                        {format(unitPrice(product))}
                      </p>
                    )}
                  </div>

                  <div className="text-center text-[11px] sm:text-sm">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        aria-label="შემცირება"
                        onClick={() => setQty(item, -1)}
                        className="text-muted-foreground hover:text-primary"
                      >
                        −
                      </button>
                      <span className="min-w-4 font-normal">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="გაზრდა"
                        onClick={() => setQty(item, 1)}
                        className="text-muted-foreground hover:text-primary"
                      >
                        +
                      </button>
                    </div>
                    {old && (
                      <p className="mt-0.5 text-[14px] font-normal text-[#EA2700]">
                        მაქს.
                      </p>
                    )}
                  </div>

                  <p className="text-[11px] font-medium sm:text-sm">
                    {product ? format(unitPrice(product) * item.quantity) : ""}
                  </p>

                  <button
                    type="button"
                    aria-label="წაშლა"
                    onClick={() => removeItem(item.productType, item.productId)}
                    className="justify-self-end text-muted-foreground hover:text-sale"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              );
            })}

            {items.length === 0 && (
              <p className="px-6 py-10 text-center text-sm text-muted-foreground">
                კალათა ცარიელია
              </p>
            )}

            {productsError && (
              <p role="alert" className="px-6 py-4 text-sm text-[#EA2700]">
                პროდუქტების ჩატვირთვა ვერ მოხერხდა, სცადეთ თავიდან
              </p>
            )}
          </section>

          {/* Summary (before checkout) */}
          {!isOrdersPlaced && items.length > 0 && (
            <OrderSummary
              subtotal={subtotal}
              discount={discount}
              deliveryFee={deliveryFee}
              total={total}
              format={format}
              disabled={!canCheckout}
              onSubmit={() => setIsOrdersPlaced(true)}
            />
          )}
        </div>

        {/* Checkout form */}
        {isOrdersPlaced && items.length > 0 && (
          <section className="mt-10 w-full space-y-5 flex-1">
            <div className="flex gap-8 flex-col md:flex-row">
              <div className="flex-1">
                <Select
                  value={form.city}
                  onChange={(v) => setField("city", v)}
                  options={["თბილისი"]}
                  disabled={delivery === "STORE_PICKUP"}
                  
                />

                <div className="mt-4 text-sm flex md:items-center gap-2 flex-col md:flex-row items-start">
                  <Radio
                    label="ფილიალიდან გატანა"
                    checked={delivery === "STORE_PICKUP"}
                    onChange={() => setDelivery("STORE_PICKUP")}
                  />
                  <Radio
                    label="მიტანის სერვისით სარგებლობა"
                    checked={delivery === "DELIVERY"}
                    onChange={() => setDelivery("DELIVERY")}
                  />
                </div>

                <p className="text-xs leading-relaxed text-muted-foreground md:border-b-[0.5px] md:border-[#888888] border-none pb-6 mt-2 text-nowrap">
                  მიტანის სერვისის საფასური - {DELIVERY_FEE}₾
                  <br />
                  მიტანის სერვისი უფასოა {FREE_DELIVERY_FROM}₾ შეკვეთის
                  შემთხვევაში
                </p>

                <div className="pt-6 flex flex-col gap-2 md:gap-4 w-full">
                  <div className="flex gap-2 md:gap-8 flex-col md:flex-row">
                    <Input
                      placeholder="მისამართი*"
                      disabled={delivery === "STORE_PICKUP"}
                      value={form.street}
                      onChange={(v) => setField("street", v)}
                    />
                  </div>

                  <Input
                    placeholder="კომენტარი"
                    value={form.comment}
                    onChange={(v) => setField("comment", v)}
                  />
                  <div className="flex gap-2 md:gap-8 flex-col md:flex-row">
                    <Input
                      placeholder="სახელი*"
                      value={form.firstName}
                      onChange={(v) => setField("firstName", v)}
                    />
                    <Input
                      placeholder="გვარი*"
                      value={form.lastName}
                      onChange={(v) => setField("lastName", v)}
                    />
                  </div>
                </div>
              </div>

              <OrderSummary
                subtotal={subtotal}
                discount={discount}
                deliveryFee={deliveryFee}
                total={total}
                format={format}
                className="order-first md:order-2"
              />
            </div>

            <hr />

            <div>
              <div className="border-b-[0.5px] border-[#888888] pb-6 md:pb-8 flex gap-4">
                <Input
                  placeholder="ელ.ფოსტა"
                  value={form.email}
                  onChange={(v) => setField("email", v)}
                />
                <Input
                  placeholder="ტელეფონის ნომერი*"
                  type="tel"
                  value={form.phone}
                  onChange={(v) => setField("phone", v)}
                />
              </div>

              <div className="flex md:gap-29 pt-6 md:pt-8 flex-col gap-6 md:flex-row">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={form.acceptedTerms}
                    onChange={(e) =>
                      setField("acceptedTerms", e.target.checked)
                    }
                    className="size-4 accent-[oklch(0.62_0.16_150)]"
                  />
                  <span className="underline text-nowrap">
                    ვეთანხმები წესებსა და პირობებს
                  </span>
                </label>

                <button
                  type="button"
                  disabled={submitting || !canCheckout}
                  onClick={placeOrder}
                  className="w-full rounded-full border py-3.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "იგზავნება..." : "შეკვეთის განთავსება"}
                </button>
              </div>

              {error && (
                <p role="alert" className="mt-4 text-sm text-[#EA2700]">
                  {error}
                </p>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function OrderSummary({
  subtotal,
  discount,
  deliveryFee,
  total,
  format,
  onSubmit,
  disabled = false,
  className = "",
}: {
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  format: (n: number) => string;
  onSubmit?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <aside
      className={`h-fit rounded-2xl border bg-card p-5 sm:p-6 ${className} flex-1 border-[#888888]! text-[11.17px] md:text-[18px]`}
    >
      <h2 className="text-[13.65px] md:text-[22px] font-extrabold tracking-tight uppercase border-b-[0.5px] border-[#888888]! pb-2">
        შეკვეთის დეტალები
      </h2>

      <dl className="pt-2">
        <div className="flex items-center justify-between pb-4">
          <dt className="text-muted-foreground">ჯამი:</dt>
          <dd className="font-semibold">{format(subtotal)}</dd>
        </div>
        <div className="flex items-center justify-between pb-4">
          <dt className="text-muted-foreground">ფასდაკლება:</dt>
          <dd className="font-semibold">{format(discount)}</dd>
        </div>
        <div className="flex items-center justify-between pb-4 border-b-[0.5px] border-[#888888]">
          <dt className="text-muted-foreground">მიტანა:</dt>
          <dd className="font-semibold">
            {deliveryFee > 0 ? format(deliveryFee) : "უფასო"}
          </dd>
        </div>
        <div className="flex items-center justify-between pt-4 pb-[79px]">
          <dt className="text-muted-foreground text-nowrap">
            გადასახდელი თანხა:
          </dt>
          <dd className="font-semibold">{format(total)}</dd>
        </div>
      </dl>

      {onSubmit && (
        <button
          type="button"
          disabled={disabled}
          className="mt-6 w-full rounded-full bg-[oklch(0.62_0.16_150)] py-3.5 font-semibold text-primary-foreground transition-opacity hover:opacity-90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onSubmit}
        >
          ყიდვა
        </button>
      )}
    </aside>
  );
}

function Select({
  value,
  onChange,
  options,
  disabled = false,
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  disabled: boolean;
}) {
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full appearance-none rounded-full border bg-transparent px-5 py-3 text-sm outline-none focus:border-primary ",
          disabled ? "bg-gray-400 cursor-not-allowed" : "",
        )}
        disabled={disabled}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-5 size-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}

function Input({
  placeholder,
  value,
  onChange,
  type = "text",
  disabled = false,
}: {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "w-full rounded-full border px-5 py-3 text-sm outline-none focus:border-primary",
        disabled ? "bg-gray-400 cursor-not-allowed" : "",
      )}
    />
  );
}

function Radio({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2">
      <input
        type="radio"
        name="delivery"
        checked={checked}
        onChange={onChange}
        className="size-4 accent-[oklch(0.62_0.16_150)]"
      />
      <span>{label}</span>
    </label>
  );
}

export default CartPage;
