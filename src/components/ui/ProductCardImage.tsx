// ProductCardImage.tsx
"use client";

import { CldImage } from "next-cloudinary";

export default function ProductCardImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={src} />
      <CldImage
        src={src}
        className="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-80"
        alt={alt}
        width={379.78}
        height={214.6}
      />
    </picture>
  );
}