/**
 * Content model for a vehicle page. Text and alt text live here; media files do
 * not: they are found by slot name (see ./assets.ts), so a vehicle's media can be
 * replaced without touching this file.
 */

export type VehicleColour = {
  /** Folder name under 360/, for example "white". */
  key: string;
  name: string;
  /** Approximate paint colour for the swatch. */
  swatch: string;
};

/** Text for one numbered image. The file is {set}-{index + 1}.webp. */
export type Captioned = { title: string; text: string; alt: string };

export type VehicleClip = {
  title: string;
  text: string;
  label: string;
};

export type Vehicle = {
  slug: string;
  name: string;
  /** Hero tagline. */
  tagline: string;
  metaDescription: string;
  /** Alt text for the hero image. */
  heroAlt: string;

  intro: { title: [string, string]; body: string[] };

  design: {
    filmLabel: string;
    title: [string, string];
    text: string;
    /** Four close-ups: detail-1 … detail-4 */
    details: Captioned[];
  };

  colours: {
    title: string;
    frames: number;
    /** Scale of the car inside the viewer, 1 = fills it. */
    zoom: number;
    items: VehicleColour[];
  };

  /** Large image with two captioned images beneath: spotlight, spotlight-detail-1/2 */
  spotlight: {
    title: string;
    text: string;
    alt: string;
    details: { label: string; alt: string }[];
  };

  interior: {
    title: string;
    text: string;
    cabinAlt: string;
    /** Two video clips: clip-1 and clip-2 */
    clips: [VehicleClip, VehicleClip];
    /** Four captioned images: feature-1 … feature-4 */
    features: Captioned[];
  };

  safety: {
    title: string;
    /** Four captioned images: safety-1 … safety-4 */
    items: Captioned[];
    clip: { title: string; text: string; label: string };
  };

  experience: {
    label: string;
    title: string;
    items: { title: string; text: string }[];
  };

  closing: { title: string; alt: string };
};
