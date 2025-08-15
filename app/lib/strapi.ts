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

function asRecord(v: unknown): Record<string, unknown> {
  return typeof v === "object" && v !== null ? (v as Record<string, unknown>) : {};
}

function getString(v: unknown): string | undefined {
  return typeof v === "string" ? v : undefined;
}

function toNumberOrNull(v: unknown): number | null {
  if (typeof v === "number") return v;
  if (typeof v === "string" && v.trim() !== "" && !Number.isNaN(Number(v))) {
    return Number(v);
  }
  return null;
}

/**
 * Handle both Strapi v5 (flat) and v4 (attributes) media structures.
 * Accepts unknown and safely extracts an absolute URL or empty string.
 */
function getSingleMediaUrl(media: unknown): string {
  const r = asRecord(media);

  // v5: { url: "/uploads/..." }
  const urlV5 = getString(r.url);
  if (urlV5) return absUrl(urlV5);

  // v4: { data: { attributes: { url: "/uploads/..." } } }
  const data = r.data;
  if (data && typeof data === "object" && !Array.isArray(data)) {
    const attrs = asRecord((data as Record<string, unknown>).attributes);
    const urlV4 = getString(attrs.url);
    if (urlV4) return absUrl(urlV4);
  }

  return "";
}

function getMultiMediaUrls(media: unknown): string[] {
  if (!media) return [];

  // v5 array: [{ url }, { url }]
  if (Array.isArray(media)) {
    return media.map((m) => getSingleMediaUrl(m)).filter((u): u is string => !!u);
  }

  // v4: { data: [{ attributes: { url }}, ...] }
  const r = asRecord(media);
  const data = r.data;
  if (Array.isArray(data)) {
    return data
      .map((m) => {
        const attrs = asRecord(asRecord(m).attributes);
        const u = getString(attrs.url);
        return u ? absUrl(u) : "";
      })
      .filter((u): u is string => !!u);
  }

  return [];
}

/**
 * Normalize a statue record from either Strapi v5 (flat) or v4 (attributes).
 */
function normalizeStatue(item: unknown): Product {
  const o = asRecord(item);
  const a = asRecord(o.attributes);

  const title = getString(a.name) ?? getString(o.name) ?? "Без име";
  const slug =
    getString(a.slug) ?? getString(o.slug) ?? (typeof o.id === "number" ? String(o.id) : "");
  const description = getString(a.description) ?? getString(o.description) ?? "";
  const price = toNumberOrNull(a.price ?? o.price);

  const coverImageUrl =
    getSingleMediaUrl(a.cover_image ?? o.cover_image) || "/product-image-placeholder.png";
  const allImages = getMultiMediaUrls(a.images ?? o.images);
  const images = allImages.length ? allImages : coverImageUrl ? [coverImageUrl] : [];

  return {
    id: typeof o.id === "number" ? o.id : undefined,
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

    const json: unknown = await res.json();
    const data = asRecord(json).data;
    const list = Array.isArray(data) ? data : [];
    return list.map(normalizeStatue).filter((p): p is Product => !!p.slug);
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

    const json: unknown = await res.json();
    const data = asRecord(json).data;
    const item = Array.isArray(data) ? data[0] : null;
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
