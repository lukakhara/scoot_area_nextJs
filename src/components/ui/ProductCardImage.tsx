// ProductCardImage.tsx
"use client";

import { CldImage } from "next-cloudinary";

export default function ProductCardImage({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}) {
  return (
      <CldImage
        src={src}
        className="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-80 "
        alt={alt}
        width={width ?? 379.78}
        height={height ?? 214.6}
      />
  );
}
