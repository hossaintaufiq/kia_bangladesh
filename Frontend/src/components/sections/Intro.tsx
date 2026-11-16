import { Soon } from "../ComingSoon";

export default function Intro() {
  return (
    <section className="bg-white px-6 py-28 md:px-12 lg:py-44">
      <div className="mx-auto grid max-w-[1600px] gap-14 lg:grid-cols-12">
        <h2 className="text-[clamp(2.1rem,4.7vw,4.8rem)] font-light leading-[1.08] tracking-[-0.022em] lg:col-span-9">
          The power of movement to unlock new ideas and endless possibilities.
        </h2>
        <div className="lg:col-span-3 lg:self-end">
          <p className="max-w-sm text-lg leading-relaxed text-ash">
            Kia Bangladesh brings Kia&apos;s global vision of mobility home, with vehicles
            designed around how people really move.
          </p>
          <Soon
            label="Who we are"
            className="link-draw mt-8 pb-1 text-lg text-midnight"
          >
            Who we are
          </Soon>
        </div>
      </div>
    </section>
  );
}
