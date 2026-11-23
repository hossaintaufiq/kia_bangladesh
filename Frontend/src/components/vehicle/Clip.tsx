"use client";

import { useEffect, useRef } from "react";
import { vehicleAssets, type VideoSlot } from "@/data/vehicles/assets";

type Props = { slug: string; slot: VideoSlot; label: string };

/**
 * Silent looping clip that fills its (relatively positioned) parent.
 * It only loads and plays while on screen, which saves data and battery on
 * phones, and it stays on its poster image for visitors who prefer reduced motion.
 */
export default function Clip({ slug, slot, label }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const assets = vehicleAssets(slug);

  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      src={assets.video(slot)}
      poster={assets.poster(slot)}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
    />
  );
}
