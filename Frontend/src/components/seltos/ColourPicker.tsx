"use client";

import { useState } from "react";
import Spin360 from "./Spin360";

// Swatch values are approximations of the paint shown in each photo.
type Colour = { name: string; file: string; swatch: string };

const SELTOS_COLOURS: readonly Colour[] = [
  { name: "Glacier White Pearl", file: "white", swatch: "#eceeef" },
  { name: "Gravity Gray", file: "gray", swatch: "#4b5a5b" },
  { name: "Gravity Gray Matt", file: "matt", swatch: "#5c6266" },
  { name: "Pewter Olive", file: "olive", swatch: "#44552f" },
  { name: "Imperial Blue", file: "blue", swatch: "#1c2f6b" },
  { name: "Intense Red", file: "red", swatch: "#b3221f" },
  { name: "Aurora Black Pearl", file: "black", swatch: "#15181a" },
];

type Props = {
  model?: string;
  colours?: readonly Colour[];
  /** Frames live at {folderBase}/{colour.file}/01.webp … */
  folderBase?: string;
  /** Still photos at {stillBase}/color-{colour.file}.webp; omit to use the first frame. */
  stillBase?: string | null;
  frames?: number;
  /** Scale of the car inside the viewer (1 = fills it). */
  zoom?: number;
};

export default function ColourPicker({
  model = "Seltos",
  colours: COLOURS = SELTOS_COLOURS,
  folderBase = "/kia/seltos/360",
  stillBase = "/kia/seltos",
  frames,
  zoom,
}: Props) {
  const [i, setI] = useState(0);

  return (
    <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-4">
      <div className="w-full lg:flex-1">
        <Spin360
          folder={`${folderBase}/${COLOURS[i].file}`}
          still={
            stillBase
              ? `${stillBase}/color-${COLOURS[i].file}.webp`
              : `${folderBase}/${COLOURS[i].file}/01.webp`
          }
          frames={frames}
          zoom={zoom}
          warm={COLOURS.filter((_, n) => n !== i).map((c) => `${folderBase}/${c.file}`)}
          alt={`Kia ${model} in ${COLOURS[i].name}`}
        />
      </div>

      <div className="flex flex-col items-center lg:-translate-y-14 lg:pl-6 lg:pr-2">
        <p aria-live="polite" className="sr-only">
          {COLOURS[i].name}
        </p>
        <div
          role="radiogroup"
          aria-label="Exterior colour"
          className="flex flex-wrap justify-center gap-3 lg:flex-col lg:flex-nowrap lg:gap-5"
        >
          {COLOURS.map((c, n) => (
            <div key={c.file} className="group relative">
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
                className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-[12.5px] bg-midnight px-3 py-1 text-xs font-bold text-white opacity-0 transition-[opacity,transform] duration-300 ease-premium group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 motion-reduce:transition-none lg:bottom-auto lg:left-auto lg:right-full lg:top-1/2 lg:mb-0 lg:mr-3 lg:-translate-x-1 lg:-translate-y-1/2 lg:group-hover:translate-x-0 lg:group-focus-within:translate-x-0"
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
