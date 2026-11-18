"use client";

import { useState } from "react";
import Image from "next/image";

// Swatch values are approximations of the paint shown in each photo.
const COLOURS = [
  { name: "Glacier White Pearl", file: "white", swatch: "#eceeef" },
  { name: "Gravity Gray", file: "gray", swatch: "#4b5a5b" },
  { name: "Gravity Gray Matt", file: "matt", swatch: "#5c6266" },
  { name: "Pewter Olive", file: "olive", swatch: "#44552f" },
  { name: "Imperial Blue", file: "blue", swatch: "#1c2f6b" },
  { name: "Intense Red", file: "red", swatch: "#b3221f" },
  { name: "Aurora Black Pearl", file: "black", swatch: "#15181a" },
] as const;

export default function ColourPicker() {
  const [i, setI] = useState(0);

  return (
    <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-4">
      <div className="relative aspect-[2/1] w-full overflow-hidden lg:flex-1">
        {COLOURS.map((c, n) => (
          <Image
            key={c.file}
            src={`/kia/seltos/color-${c.file}.webp`}
            alt={n === i ? `Kia Seltos in ${c.name}` : ""}
            aria-hidden={n !== i}
            fill
            sizes="(min-width: 1280px) 1000px, 100vw"
            className={`object-contain max-lg:scale-[1.3] transition-opacity duration-500 motion-reduce:transition-none ${
              n === i ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
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
