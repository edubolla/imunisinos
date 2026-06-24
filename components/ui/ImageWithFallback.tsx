"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

type ImageWithFallbackProps = ImageProps & {
  fallbackLabel?: string;
};

function BugIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-8 w-8 sm:h-10 sm:w-10"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9.5a3.5 3.5 0 0 1 3.5 3.5v3a3.5 3.5 0 0 1-7 0v-3A3.5 3.5 0 0 1 12 9.5Z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12H4M20 12h-5M12 9.5V6m0 0a2 2 0 1 0-2-2M12 6a2 2 0 1 1 2-2M8.5 17l-2.5 2M15.5 17l2.5 2M8.5 9l-2-2.5M15.5 9l2-2.5" />
    </svg>
  );
}

export default function ImageWithFallback({
  fallbackLabel,
  alt,
  className,
  style,
  ...rest
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    const isFill = "fill" in rest && rest.fill;
    const sizeStyle = isFill
      ? undefined
      : {
          width: "width" in rest ? rest.width : undefined,
          height: "height" in rest ? rest.height : undefined,
          ...style,
        };

    return (
      <div
        role="img"
        aria-label={typeof alt === "string" ? alt : undefined}
        className={`flex flex-col items-center justify-center gap-2 bg-primary-light text-primary-dark ${className ?? ""}`}
        style={sizeStyle}
      >
        <BugIcon />
        {fallbackLabel ? (
          <span className="px-3 text-center text-xs font-medium text-secondary/60">
            {fallbackLabel}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <Image
      alt={alt}
      className={className}
      style={style}
      onError={() => setHasError(true)}
      {...rest}
    />
  );
}
