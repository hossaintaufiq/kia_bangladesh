// Verifies every media file a vehicle page needs exists in public/vehicles.
// Run with: npm run check:assets
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { VEHICLES } from "../src/data/vehicles/index.ts";
import { IMAGE_SLOTS, VIDEO_SLOTS, vehicleAssets } from "../src/data/vehicles/assets.ts";

const pub = join(import.meta.dirname, "..", "public");
const onDisk = (url) => existsSync(join(pub, url));
let missing = 0;

for (const v of VEHICLES) {
  const a = vehicleAssets(v.slug);
  const need = [];

  for (const slot of IMAGE_SLOTS.single) need.push(a.image(slot));
  const counts = {
    detail: v.design.details.length,
    feature: v.interior.features.length,
    safety: v.safety.items.length,
    "spotlight-detail": v.spotlight.details.length,
  };
  for (const [set, n] of Object.entries(counts))
    for (let i = 1; i <= n; i++) need.push(a.setImage(set, i));
  for (const slot of VIDEO_SLOTS) need.push(a.video(slot), a.poster(slot));
  for (const c of v.colours.items)
    for (let n = 1; n <= v.colours.frames; n++) need.push(a.frame(c.key, n));

  const lost = need.filter((u) => !onDisk(u));
  missing += lost.length;

  // Files on disk that no slot refers to, so leftovers are easy to spot.
  const known = new Set(need);
  const extra = [];
  for (const dir of ["images", "videos"]) {
    const d = join(pub, "vehicles", v.slug, dir);
    if (existsSync(d))
      for (const f of readdirSync(d)) if (!known.has(`/vehicles/${v.slug}/${dir}/${f}`)) extra.push(`${dir}/${f}`);
  }

  console.log(`${lost.length ? "FAIL" : "ok  "} ${v.slug}: ${need.length - lost.length}/${need.length} files`);
  lost.slice(0, 12).forEach((u) => console.log(`       missing ${u}`));
  if (lost.length > 12) console.log(`       …and ${lost.length - 12} more`);
  extra.forEach((f) => console.log(`       unused  ${f}`));
}

process.exit(missing ? 1 : 0);
