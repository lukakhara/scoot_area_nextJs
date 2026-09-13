"use client";
import { useState } from "react";
import Image from "next/image";

export function ImageThumbnailGallery({
  imagePath,
}: {
  imagePath: { mobile: string; desktop: string };
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="mt-4 grid grid-cols-3 gap-4">
      {[0, 1, 2].map((i) => (
        <button
          key={i}
          onClick={() => setActive(i)}
          aria-label={`სურათი ${i + 1}`}
          className={`overflow-hidden rounded-xl border bg-card transition-colors ${
            active === i ? "border-primary" : "hover:border-primary/50"
          }`}
        >
          <picture>
            <source media="(min-width: 768px)" srcSet={imagePath.desktop} />
            <Image
              src={imagePath.mobile}
              className="aspect-[4/3] w-full object-cover"
              alt="product image"
              height={189}
              width={189}
            />
          </picture>
        </button>
      ))}
    </div>
  );
}