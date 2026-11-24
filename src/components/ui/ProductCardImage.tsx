// ProductCardImage.tsx
"use client";

import { toPublicId } from "@/lib/cloudinary";
import { CldImage } from "next-cloudinary";

export default function ProductCardImage({
  src,
  alt,
  width,
  height,
  sizes,
  fill,
  className = "",
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  fill?: boolean;
  className?: string;
}) {
  const common = {
    src: toPublicId(src),
    alt,
    sizes: sizes ?? "(min-width: 1024px) 50vw, 100vw",
    className: `group-hover:scale-105 group-hover:opacity-80 ${className}`,
  };

  return fill ? (
    <CldImage {...common} fill />
  ) : (
    <CldImage {...common} width={width ?? 1200} height={height ?? 900} />
  );
}
