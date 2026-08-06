"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Renders product art with optional fallback when PNG/WebP is not uploaded yet.
 */
export function ProductMedia({
  src,
  fallbackSrc,
  alt,
  className = "object-contain",
  sizes,
  priority,
  fill,
}: {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
  fill?: boolean;
}) {
  const [current, setCurrent] = useState(src);

  return (
    <Image
      src={current}
      alt={alt}
      fill={fill ?? true}
      className={className}
      sizes={sizes}
      priority={priority}
      onError={() => {
        if (fallbackSrc && current !== fallbackSrc) setCurrent(fallbackSrc);
      }}
    />
  );
}
