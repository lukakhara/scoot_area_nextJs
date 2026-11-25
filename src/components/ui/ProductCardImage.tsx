// ProductCardImage.tsx
"use client";

import { toPublicId } from "@/lib/cloudinary";
import { CldImage } from "next-cloudinary";

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  fill?: boolean;
  className?: string;
};

export default function ProductCardImage({
  src,
  alt,
  width = 440,
  height = 440,
  sizes = "(min-width: 1024px) 440px, (min-width: 640px) 50vw, 100vw",
  fill,
  className = "",
}: Props) {
  const common = {
    src: toPublicId(src),
    alt,
    sizes,
    className: `group-hover:scale-105 group-hover:opacity-80 ${className}`,
  };

  return fill ? (
    <CldImage {...common} fill />
  ) : (
    <CldImage {...common} width={width} height={height} />
  );
}
