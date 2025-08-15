// app/lib/strapi.ts
import { Product } from "@/types/product";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

/**
 * Build default headers; uses a server-side API token if provided.
 * Note: This file runs on the server (Server Components / Route handlers), so
 * STRAPI_API_TOKEN is safe here.
 */
function buildHeaders() {
  const headers = new Headers({ "Content-Type": "application/json" });
  const token = process.env.STRAPI_API_TOKEN;
  if (token) headers.set("Authorization", `Bearer ${token}`);
  return headers;
}

function absUrl(url?: string | null) {
  if (!url) return "";
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

/**
 * Handle both Strapi v5 (flat) and v4 (attributes) media structures.
 */
function getSingleMediaUrl(media: any): string {
  // v5: { url: "/uploads/..." }
  if (media?.url) return absUrl(media.url);

  // v4: { data: { attributes: { url: "/uploads/..." } } }
  const v4url = media?.data?.attributes?.url;
  if (v4url) return absUrl(v4url);

  return "";
}

function getMultiMediaUrls(media: any): string[] {
  if (!media) return [];

  // v5: images: [{ url: ... }, { url: ... }]
  if (Array.isArray(media)) {
    return media
      .map((m) => getSingleMediaUrl(m))
      .filter((u: string) => !!u);
  }

  // v4: images: { data: [{ attributes: { url }}, ...] }
  if (Array.isArray(media?.data)) {
    return media.data
      .map((m: any) => getSingleMediaUrl(m?.attributes ? { url: m.attributes.url } : m))
      .filter((u: string) => !!u);
  }

  return [];
}

/**
 * Normalize a statue record from either Strapi v5 (flat) or v4 (attributes).
 */
function normalizeStatue(item: any): Product {
  // v4 keeps payload in `attributes`, v5 is flat
  const a = item?.attributes ?? item ?? {};

  const title = a?.name ?? "Без име";
  const slug = a?.slug ?? String(item?.id ?? "");
  const description = a?.description ?? "";
  const price = a?.price == null ? null : Number(a.price);

  const coverImageUrl =
    getSingleMediaUrl(a?.cover_image) || "/product-image-placeholder.png";
  const allImages = getMultiMediaUrls(a?.images);
  const images = allImages.length ? allImages : (coverImageUrl ? [coverImageUrl] : []);

  return {
    id: item?.id,
    title,
    slug,
    description,
    price,
    coverImage: coverImageUrl,
    images,
  };
}

export async function fetchStatues(): Promise<Product[]> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/statues?populate=*&sort=updatedAt:desc`,
      { headers: buildHeaders(), next: { revalidate: 60 } }
    );
    if (!res.ok) return [];

    const json = await res.json();
    const list = Array.isArray(json?.data) ? json.data : [];
    return list
      .map(normalizeStatue)
      .filter((p: Product) => !!p.slug);
  } catch {
    return [];
  }
}

export async function fetchStatueBySlug(slug: string): Promise<Product | null> {
  try {
    const url = new URL(`${STRAPI_URL}/api/statues`);
    url.searchParams.set("filters[slug][$eq]", slug);
    url.searchParams.set("populate", "*");

    const res = await fetch(url.toString(), {
      headers: buildHeaders(),
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;

    const json = await res.json();
    const item = json?.data?.[0];
    if (!item) return null;

    return normalizeStatue(item);
  } catch {
    return null;
  }
}

/**
 * Return N random statues from the latest list.
 * Uses a stable shuffle per request.
 */
export async function fetchRandomStatues(n: number): Promise<Product[]> {
  const list = await fetchStatues();
  if (list.length <= n) return list;

  // Fisher–Yates
  const arr = list.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, n);
}
