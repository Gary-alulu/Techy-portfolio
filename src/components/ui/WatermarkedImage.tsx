"use client";

import Image, { ImageProps } from "next/image";

interface WatermarkedImageProps extends ImageProps {}

export default function WatermarkedImage({ 
  src, 
  alt, 
  className, 
  fill,
  ...props 
}: WatermarkedImageProps) {
  // Extract the string URL from the src prop
  const srcString = typeof src === 'string' ? src : (src as any).src || "";
  
  // Construct the URL to our API route
  const watermarkedSrc = `/api/watermark?url=${encodeURIComponent(srcString)}`;

  return (
    <div className={`${fill ? 'absolute inset-0' : 'relative'} w-full h-full`}>
      {/* The original image shown on the page. pointer-events-none prevents direct interaction. */}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        className={`pointer-events-none ${className || ""}`}
        {...props}
      />
      
      {/* The invisible watermarked image that receives the right-click and Save Image As action */}
      {/* We apply the same className (like object-cover, scale transforms) so it perfectly aligns */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={watermarkedSrc}
        alt={alt}
        className={`absolute inset-0 w-full h-full opacity-0 z-10 cursor-context-menu ${className || ""}`}
      />
    </div>
  );
}
