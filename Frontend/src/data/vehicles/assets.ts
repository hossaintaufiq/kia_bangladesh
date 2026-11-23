/**
 * Single source of truth for where a vehicle's media lives.
 *
 * Every vehicle uses the same fixed file names ("slots"), so swapping in
 * official Kia Bangladesh media means overwriting files, never editing code:
 *
 *   public/vehicles/{slug}/images/{slot}.webp
 *   public/vehicles/{slug}/videos/{slot}.mp4  (+ {slot}-poster.webp)
 *   public/vehicles/{slug}/360/{colour}/01.webp … {frames}.webp
 *
 * See docs/vehicle-media.md for the full slot list and image sizes.
 * This file has no imports on purpose: scripts/check-assets.mjs loads it too.
 */

export const IMAGE_SLOTS = {
  single: ["hero", "closing", "cabin", "spotlight", "nav"],
  /** Slots that come in numbered sets, with the count taken from the vehicle data. */
  sets: ["detail", "feature", "safety", "spotlight-detail"],
} as const;

export const VIDEO_SLOTS = ["film", "tour", "clip-1", "clip-2", "safety-clip"] as const;

export type VideoSlot = (typeof VIDEO_SLOTS)[number];

const pad = (n: number) => String(n).padStart(2, "0");

export const vehicleAssets = (slug: string) => {
  const root = `/vehicles/${slug}`;
  return {
    root,
    image: (slot: string) => `${root}/images/${slot}.webp`,
    /** Numbered image from a set, for example setImage("detail", 2) is detail-2. */
    setImage: (set: string, n: number) => `${root}/images/${set}-${n}.webp`,
    video: (slot: string) => `${root}/videos/${slot}.mp4`,
    poster: (slot: string) => `${root}/videos/${slot}-poster.webp`,
    frames: (colour: string) => `${root}/360/${colour}`,
    frame: (colour: string, n: number) => `${root}/360/${colour}/${pad(n)}.webp`,
  };
};
