import Image from "next/image";
import { Soon } from "../ComingSoon";

type Tile = { title: string; image: string; className: string; sizes: string };

const TILES: Tile[] = [
  {
    title: "Opposites United",
    image: "/kia/design-1.webp",
    className: "aspect-[4/5] md:col-span-7 md:row-span-2 md:aspect-auto",
    sizes: "(min-width: 768px) 58vw, 100vw",
  },
  {
    title: "Meet the creators",
    image: "/kia/design-2.webp",
    className: "aspect-[4/3] md:col-span-5 md:aspect-auto",
    sizes: "(min-width: 768px) 42vw, 100vw",
  },
  {
    title: "Inspiration from nature",
    image: "/kia/design-3.webp",
    className: "aspect-[4/3] md:col-span-5 md:aspect-auto",
    sizes: "(min-width: 768px) 42vw, 100vw",
  },
];

function TileButton({ tile }: { tile: Tile }) {
  return (
    <Soon
      label={tile.title}
      className={`group relative block overflow-hidden bg-midnight text-left text-white ${tile.className}`}
    >
      <Image
        src={tile.image}
        alt=""
        fill
        sizes={tile.sizes}
        className="object-cover transition-transform duration-[1400ms] ease-premium group-hover:scale-105 motion-reduce:transition-none"
      />
      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-transparent to-transparent"
      />
      <span className="absolute bottom-0 left-0 p-6 text-2xl font-light tracking-tight md:p-8 md:text-3xl">
        {tile.title}
      </span>
    </Soon>
  );
}

export default function Design() {
  return (
    <section className="bg-stone px-6 py-28 md:px-12 lg:py-44">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-14 grid gap-8 md:mb-20 lg:grid-cols-12">
          <h2 className="text-[clamp(2.2rem,4.4vw,4.4rem)] font-light leading-[1.04] tracking-[-0.022em] lg:col-span-7">
            Design that finds possibility in contrast
          </h2>
          <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <p className="max-w-md text-lg leading-relaxed text-ash">
              Opposites United is Kia&apos;s design philosophy: the tension and harmony of
              contrasts, shaped into every vehicle.
            </p>
            <Soon label="Design" className="link-draw mt-7 pb-1 text-lg">
              Explore design
            </Soon>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-12 md:grid-rows-2 md:gap-3 md:h-[min(86svh,880px)]">
          {TILES.map((t) => (
            <TileButton key={t.title} tile={t} />
          ))}
        </div>
        <div className="mt-3">
          <TileButton
            tile={{
              title: "Design exhibition",
              image: "/kia/design-4.webp",
              className: "aspect-[4/3] w-full md:aspect-[21/9]",
              sizes: "100vw",
            }}
          />
        </div>
      </div>
    </section>
  );
}
