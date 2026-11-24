"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchProductCount, fetchProducts } from "@/lib/adminProducts";
import type { ProductKind, ProductRow } from "@/components/admin/productFields";

export function useAdminProducts(kind: ProductKind, search: string) {
  const [rows, setRows] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [version, setVersion] = useState(0);

  const reload = useCallback(() => setVersion((v) => v + 1), []);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(
      async () => {
        setLoading(true);
        setError(false);
        try {
          const data = await fetchProducts(
            kind,
            search.trim(),
            controller.signal,
          );
          setRows(data);
        } catch {
          if (!controller.signal.aborted) setError(true);
        } finally {
          if (!controller.signal.aborted) setLoading(false);
        }
      },
      search ? 300 : 0,
    );

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [kind, search, version]);

  return { rows, loading, error, reload };
}

export function useProductCounts(kinds: ProductKind[], refreshKey: unknown) {
  const [counts, setCounts] = useState<Partial<Record<ProductKind, number>>>(
    {},
  );

  useEffect(() => {
    const controller = new AbortController();
    Promise.all(
      kinds.map(async (k) => {
        const total = await fetchProductCount(k, controller.signal);
        return [k, total] as const;
      }),
    )
      .then((entries) => setCounts(Object.fromEntries(entries)))
      .catch(() => {});
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  return counts;
}
