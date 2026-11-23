"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export type LineupVehicle = { slug: string; name: string; summary: string; image: string };

export default function Lineup({ vehicles }: { vehicles: LineupVehicle[] }) {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-white px-6 pb-28 md:px-12 lg:pb-44">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
          <h2 className="text-[clamp(2rem,3.8vw,3.75rem)] font-light leading-[1.05] tracking-[-0.02em]">
            Choose your Kia
          </h2>
        </div>

        <div className="flex flex-col gap-3 md:h-[78svh] md:min-h-[580px] md:max-h-[820px] md:flex-row md:gap-2">
          {vehicles.map((p, i) => {
            const on = active === i;
            return (
              <article
                key={p.slug}
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
                  className={`object-cover object-[50%_60%] transition-transform duration-[1400ms] ease-premium motion-reduce:transition-none ${
                    on ? "scale-100" : "scale-110"
                  }`}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-midnight/85 via-midnight/10 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-9">
                  <h3 className="text-[clamp(1.7rem,2.4vw,2.6rem)] font-light leading-tight tracking-tight">
                    {p.name}
                  </h3>
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-700 ease-premium motion-reduce:transition-none max-md:!grid-rows-[1fr] max-md:!opacity-100 ${
                      on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="mt-4 max-w-md text-lg font-light leading-relaxed text-white/85">
                        {p.summary}
                      </p>
                      <Link href={`/vehicles/${p.slug}`} className="btn btn-light mt-6">
                        Explore {p.name}
                      </Link>
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
