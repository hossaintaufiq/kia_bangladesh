import Image from "next/image";
import { Soon } from "../ComingSoon";

const CARDS = [
  {
    title: "Drive it yourself",
    cta: "Book a test drive",
    image: "/kia/design-background.webp",
  },
  {
    title: "Visit us in person",
    cta: "Find a showroom",
    image: "/kia/brand-background.webp",
  },
];

export default function Cta() {
  return (
    <section className="grid md:grid-cols-2">
      {CARDS.map((c) => (
        <div key={c.title} className="relative min-h-[420px] overflow-hidden bg-midnight text-white md:min-h-[68svh]">
          <Image
            src={c.image}
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-midnight/45" />
          <div className="relative flex h-full min-h-[inherit] flex-col justify-end p-6 md:p-14">
            <h2 className="text-[clamp(2rem,3.6vw,3.6rem)] font-light leading-[1.05] tracking-[-0.02em]">
              {c.title}
            </h2>
            <Soon
              label={c.cta}
              className="mt-7 self-start rounded-full bg-white px-7 py-3.5 text-base text-midnight transition-colors duration-300 hover:bg-kia-red hover:text-white"
            >
              {c.cta}
            </Soon>
          </div>
        </div>
      ))}
    </section>
  );
}
