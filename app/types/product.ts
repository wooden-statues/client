// client/app/types/product.ts
export type Product = {
    title?: string;
    coverImage: string;
    images?: string[];
    description?: string;
    id?: number;
    slug?: string;
    price?: number | null;
  };
  