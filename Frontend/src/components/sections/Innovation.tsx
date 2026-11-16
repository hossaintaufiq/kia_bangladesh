"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Soon } from "../ComingSoon";

const ITEMS = [
  { title: "Software and AI", text: "Software that connects every journey and keeps getting better.", image: "/kia/innovation-1.webp" },
  { title: "Performance", text: "The evolution of power.", image: "/kia/innovation-2.webp" },
  { title: "Smart city", text: "Technology for people, rethinking the city.", image: "/kia/innovation-3.webp" },
  { title: "Future mobility", text: "New ways to move, beyond the car.", image: "/kia/innovation-4.webp" },
];

export default function Innovation() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative overflow-hidden bg-midnight px-6 py-28 text-white md:px-12 lg:py-44">
      <Image
        src="/kia/innovation-background.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div aria-hidden className="absolute inset-0 bg-midnight/70" />

      <div className="relative mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <h2 className="mb-12 text-[clamp(2.2rem,4.4vw,4.4rem)] font-light leading-[1.04] tracking-[-0.022em] md:mb-16">
            Technology that moves with you
          </h2>
          <ul className="border-t border-white/20">
            {ITEMS.map((it, i) => {
              const on = active === i;
              return (
                <li key={it.title} className="border-b border-white/20">
                  <Soon
                    label={it.title}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="block w-full py-6 text-left md:py-8"
                  >
                    <span
                      className={`block text-[clamp(1.6rem,2.8vw,2.8rem)] font-light tracking-tight transition-opacity duration-500 ${
                        on ? "opacity-100" : "opacity-45"
                      }`}
                    >
                      {it.title}
                    </span>
                    <span
                      className={`grid transition-[grid-template-rows,opacity] duration-700 ease-premium motion-reduce:transition-none ${
                        on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <span className="overflow-hidden">
                        <span className="mt-3 block max-w-md text-lg font-light text-white/80">
                          {it.text}
                        </span>
                      </span>
                    </span>
                  </Soon>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-white/5 lg:aspect-[4/5]">
            <AnimatePresence initial={false}>
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={ITEMS[active].image}
                  alt={ITEMS[active].title}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
