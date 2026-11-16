import Image from "next/image";
import { Soon } from "../ComingSoon";

type Card = { title: string; text: string; image: string; className: string; sizes: string };

const CARDS: Card[] = [
  {
    title: "Who we are",
    text: "The power of movement to unlock new ideas and endless possibilities.",
    image: "/kia/brand-1.webp",
    className: "aspect-[4/5] md:col-span-7 md:row-span-2 md:aspect-auto",
    sizes: "(min-width: 768px) 58vw, 100vw",
  },
  {
    title: "Brand heritage",
    text: "Explore Kia's heritage archive.",
    image: "/kia/brand-2.webp",
    className: "aspect-[4/3] md:col-span-5 md:aspect-auto",
    sizes: "(min-width: 768px) 42vw, 100vw",
  },
  {
    title: "Kia and FIFA",
    text: "Kia's commitment to sport through its global partnership with FIFA.",
    image: "/kia/brand-3.webp",
    className: "aspect-[4/3] md:col-span-5 md:aspect-auto",
    sizes: "(min-width: 768px) 42vw, 100vw",
  },
];

export default function Brand() {
  return (
    <section className="bg-white px-6 py-28 md:px-12 lg:py-44">
      <div className="mx-auto max-w-[1600px]">
        <h2 className="mb-14 max-w-3xl text-[clamp(2.2rem,4.4vw,4.4rem)] font-light leading-[1.04] tracking-[-0.022em] md:mb-20">
          More than a carmaker
        </h2>
        <div className="grid gap-3 md:h-[min(84svh,860px)] md:grid-cols-12 md:grid-rows-2">
          {CARDS.map((c) => (
            <Soon
              key={c.title}
              label={c.title}
              className={`group relative block overflow-hidden bg-midnight text-left text-white ${c.className}`}
            >
              <Image
                src={c.image}
                alt=""
                fill
                sizes={c.sizes}
                className="object-cover transition-transform duration-[1400ms] ease-premium group-hover:scale-105 motion-reduce:transition-none"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-midnight/75 via-midnight/5 to-transparent"
              />
              <span className="absolute inset-x-0 bottom-0 block p-6 md:p-9">
                <span className="block text-3xl font-light tracking-tight md:text-4xl">{c.title}</span>
                <span className="mt-3 block max-w-md text-base font-light leading-relaxed text-white/85 md:text-lg">
                  {c.text}
                </span>
              </span>
            </Soon>
          ))}
        </div>
      </div>
    </section>
  );
}
