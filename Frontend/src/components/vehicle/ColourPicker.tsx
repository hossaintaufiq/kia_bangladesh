"use client";

import { useState } from "react";
import Spin360 from "./Spin360";
import { vehicleAssets } from "@/data/vehicles/assets";
import type { VehicleColour } from "@/data/vehicles/types";

type Props = {
  slug: string;
  /** Display name, used in alt text, for example "Seltos". */
  name: string;
  colours: readonly VehicleColour[];
  frames: number;
  /** Scale of the car inside the viewer (1 = fills it). */
  zoom?: number;
};

export default function ColourPicker({ slug, name, colours, frames, zoom }: Props) {
  const [i, setI] = useState(0);
  const assets = vehicleAssets(slug);
  const current = colours[i];

  return (
    <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-4">
      <div className="w-full lg:flex-1">
        <Spin360
          folder={assets.frames(current.key)}
          still={assets.frame(current.key, 1)}
          frames={frames}
          zoom={zoom}
          warm={colours.filter((_, n) => n !== i).map((c) => assets.frames(c.key))}
          alt={`Kia ${name} in ${current.name}`}
        />
      </div>

      <div className="flex flex-col items-center lg:-translate-y-14 lg:pl-6 lg:pr-2">
        <p aria-live="polite" className="sr-only">
          {current.name}
        </p>
        <div
          role="radiogroup"
          aria-label="Exterior colour"
          className="flex flex-wrap justify-center gap-3 lg:flex-col lg:flex-nowrap lg:gap-5"
        >
          {colours.map((c, n) => (
            <div key={c.key} className="group relative">
              <button
                type="button"
                role="radio"
                aria-checked={n === i}
                aria-label={c.name}
                onClick={() => setI(n)}
                className={`block h-9 w-9 rounded-full border border-midnight/20 transition-[box-shadow,transform] duration-300 ease-premium hover:scale-110 focus-visible:scale-110 motion-reduce:transition-none ${
                  n === i ? "shadow-[0_0_0_2px_#fff,0_0_0_3px_#05141f]" : ""
                }`}
                style={{ background: c.swatch }}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-full max-lg:hidden left-1/2 mb-3 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-[12.5px] bg-midnight px-3 py-1 text-xs font-bold text-white opacity-0 transition-[opacity,transform] duration-300 ease-premium group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 motion-reduce:transition-none lg:bottom-auto lg:left-auto lg:right-full lg:top-1/2 lg:mb-0 lg:mr-3 lg:-translate-x-1 lg:-translate-y-1/2 lg:group-hover:translate-x-0 lg:group-focus-within:translate-x-0"
              >
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
