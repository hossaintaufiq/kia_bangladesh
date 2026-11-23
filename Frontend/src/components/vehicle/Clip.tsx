import { vehicleAssets, type VideoSlot } from "@/data/vehicles/assets";

type Props = { slug: string; slot: VideoSlot; label: string };

/** Silent looping clip that fills its (relatively positioned) parent. */
export default function Clip({ slug, slot, label }: Props) {
  const assets = vehicleAssets(slug);
  return (
    <video
      className="absolute inset-0 h-full w-full object-cover"
      src={assets.video(slot)}
      poster={assets.poster(slot)}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
    />
  );
}
