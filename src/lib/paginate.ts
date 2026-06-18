import type { CollectionEntry } from "astro:content";

export function paginateCollection<
  C extends CollectionEntry<any>
>(
  items: C[],
  page: number,
  pageSize: number,
  sortFn: (a: C, b: C) => number
) {
  const sorted = [...items].sort(sortFn);

  const totalItems = sorted.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const safePage = Math.min(Math.max(page, 1), totalPages);

  const start = (safePage - 1) * pageSize;
  const end = start + pageSize;

  return {
    items: sorted.slice(start, end),
    page: safePage,
    totalPages,
    hasNext: safePage < totalPages,
    hasPrev: safePage > 1,
  };
}