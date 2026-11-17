"use client";
import { useState } from "react";
import Image from "next/image";

export function ImageThumbnailGallery({ imagePath }: { imagePath: string }) {
  const [active, setActive] = useState(0);

  return (
    <>
      {[0, 1, 2].map((i) => (
        <button
          key={i}
          onClick={() => setActive(i)}
          aria-label={`სურათი ${i + 1}`}
          className={`relative aspect-square w-full overflow-hidden rounded-xl shadow-[0_4px_4px_2px_rgba(0,0,0,0.05)] bg-card transition-colors ${
            active === i ? "border-primary" : "hover:border-primary/50"
          }`}
        >
          <Image
            src={imagePath}
            alt="product image"
            fill
            sizes="(min-width: 1024px) 17vw, 33vw"
            className="object-cover hover:opacity-60"
          />
        </button>
      ))}
    </>
  );
}