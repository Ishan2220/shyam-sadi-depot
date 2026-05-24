import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Curated Unsplash saree / textile imagery when API paths are local-only */
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1583391733958-656f5053228a?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1566171213879-0a45d2b9326b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=900&q=80",
];

export function productImageUrl(src: string | undefined, seed = 0): string {
  if (src?.startsWith("http")) return src;
  const n = Math.abs(seed) % FALLBACK_IMAGES.length;
  return FALLBACK_IMAGES[n];
}

export function productId(p: { id?: string; _id?: string }): string {
  return p.id ?? p._id ?? "";
}
