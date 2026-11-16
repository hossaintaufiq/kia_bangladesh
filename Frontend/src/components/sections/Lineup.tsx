"use client";

import { useState } from "react";
import Image from "next/image";
import { Soon } from "../ComingSoon";

const PANELS = [
  {
    title: "Electric",
    text: "A diverse EV lineup defines the new era of electrified mobility.",
    cta: "Explore electric",
    image: "/kia/vehicle-2.webp",
    position: "52% 62%",
  },
  {
    title: "Hybrid",
    text: "Efficiency and performance, combined in one drive.",
    cta: "Explore hybrid",
    image: "/kia/vehicle-1.webp",
    position: "60% 50%",
  },
  {
    title: "Purpose built",
    text: "A new concept of mobility space, shaped around what you need to do.",
    cta: "Explore PBV",
    image: "/kia/vehicle-3.webp",
    position: "50% 50%",
  },
];

export default function Lineup() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-white px-6 pb-28 md:px-12 lg:pb-44">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
          <h2 className="text-[clamp(2rem,3.8vw,3.75rem)] font-light leading-[1.05] tracking-[-0.02em]">
            Choose how you move
          </h2>
          <Soon label="All vehicles" className="link-draw hidden pb-1 text-lg md:inline-block">
            View all vehicles
          </Soon>
        </div>

        <div className="flex flex-col gap-3 md:h-[78svh] md:min-h-[580px] md:max-h-[820px] md:flex-row md:gap-2">
          {PANELS.map((p, i) => {
            const on = active === i;
            return (
              <article
                key={p.title}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                style={{ flexGrow: on ? 3.2 : 1 }}
                className="group relative aspect-[4/5] min-w-0 basis-0 overflow-hidden bg-midnight text-white transition-[flex-grow] duration-[900ms] ease-premium motion-reduce:transition-none md:aspect-auto"
              >
                <Image
                  src={p.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  style={{ objectPosition: p.position }}
                  className={`object-cover transition-transform duration-[1400ms] ease-premium motion-reduce:transition-none ${
                    on ? "scale-100" : "scale-110"
                  }`}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-midnight/85 via-midnight/10 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-9">
                  <h3 className="text-[clamp(1.7rem,2.4vw,2.6rem)] font-light leading-tight tracking-tight">
                    {p.title}
                  </h3>
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-700 ease-premium motion-reduce:transition-none max-md:!grid-rows-[1fr] max-md:!opacity-100 ${
                      on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="mt-4 max-w-md text-lg font-light leading-relaxed text-white/85">
                        {p.text}
                      </p>
                      <Soon
                        label={p.cta}
                        className="mt-6 rounded-full bg-white px-6 py-3 text-base text-midnight transition-colors duration-300 hover:bg-kia-red hover:text-white"
                      >
                        {p.cta}
                      </Soon>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
