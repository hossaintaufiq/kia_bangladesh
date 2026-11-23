import Image from "next/image";
import { Soon } from "@/components/ComingSoon";
import Footer from "@/components/sections/Footer";
import { vehicleAssets } from "@/data/vehicles/assets";
import type { Vehicle } from "@/data/vehicles/types";
import ColourPicker from "./ColourPicker";
import Clip from "./Clip";

const H2 = "text-[clamp(2rem,3.8vw,3.75rem)] font-light leading-[1.05] tracking-[-0.02em]";
const H3 = "text-[clamp(1.6rem,2.6vw,2.6rem)] font-light leading-tight tracking-tight";
const BODY = "text-lg font-light leading-relaxed";

/**
 * One page template for every vehicle. All words come from the vehicle's data
 * file and all media from its slot-named files, so adding or restyling a model
 * never means copying this page. See src/data/vehicles and docs/vehicle-media.md.
 */
export default function VehiclePage({ vehicle: v }: { vehicle: Vehicle }) {
  const a = vehicleAssets(v.slug);

  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-midnight text-white">
        <Image
          src={a.image("hero")}
          alt={v.heroAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_60%]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,20,31,0.85)_0%,rgba(5,20,31,0.1)_55%,rgba(5,20,31,0.35)_100%)]"
        />
        <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-14 md:px-12 md:pb-20">
          <h1 className="text-[clamp(4rem,13vw,13rem)] font-light leading-[0.9] tracking-[-0.04em]">
            {v.name}
          </h1>
          <p className="mt-6 max-w-2xl text-[clamp(1.25rem,2vw,1.9rem)] font-light leading-snug">
            {v.tagline}
          </p>
          <Soon label="Book a test drive" className="btn btn-light mt-8">
            Book a test drive
          </Soon>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-white px-6 py-24 md:px-12 lg:py-40">
        <div className="mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          <h2 className={H2}>
            {v.intro.title[0]}
            <br />
            {v.intro.title[1]}
          </h2>
          <div className={`max-w-xl space-y-6 text-midnight/80 ${BODY}`}>
            {v.intro.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Design */}
      <section className="bg-stone px-6 py-24 md:px-12 lg:py-40">
        <div className="mx-auto max-w-[1600px]">
          <div className="relative aspect-[3/2] w-full overflow-hidden bg-midnight md:aspect-[16/9]">
            <Clip slug={v.slug} slot="film" label={v.design.filmLabel} />
          </div>
          <div className="mt-12 grid gap-8 lg:mt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
            <h2 className={H2}>
              {v.design.title[0]}
              <br />
              {v.design.title[1]}
            </h2>
            <p className={`max-w-xl text-midnight/80 ${BODY}`}>{v.design.text}</p>
          </div>

          <div className="mt-20 grid gap-x-2 gap-y-12 md:grid-cols-2 lg:mt-32">
            {v.design.details.map((d, n) => (
              <figure key={d.title}>
                <div className="relative aspect-[16/10] overflow-hidden bg-white">
                  <Image
                    src={a.setImage("detail", n + 1)}
                    alt={d.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-5">
                  <h3 className="text-2xl font-light tracking-tight">{d.title}</h3>
                  <p className={`mt-2 max-w-md text-midnight/75 ${BODY}`}>{d.text}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Colours and 360° */}
      <section className="bg-white px-6 py-24 md:px-12 lg:py-40">
        <div className="mx-auto max-w-[1300px]">
          <h2 className={`${H2} mx-auto max-w-4xl text-center`}>{v.colours.title}</h2>
          <div className="mt-12 lg:mt-20">
            <ColourPicker
              slug={v.slug}
              name={v.name}
              colours={v.colours.items}
              frames={v.colours.frames}
              zoom={v.colours.zoom}
            />
          </div>
        </div>
      </section>

      {/* Spotlight */}
      <section className="relative overflow-hidden bg-midnight text-white">
        <div className="relative aspect-[4/5] w-full md:aspect-[16/8]">
          <Image
            src={a.image("spotlight")}
            alt={v.spotlight.alt}
            fill
            sizes="100vw"
            className="object-cover object-[50%_65%]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,20,31,0.85),transparent_60%)]"
          />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1600px] px-6 pb-10 md:px-12 md:pb-16">
            <h2 className={H2}>{v.spotlight.title}</h2>
            <p className={`mt-5 max-w-xl text-white/85 ${BODY}`}>{v.spotlight.text}</p>
          </div>
        </div>
        <div className="mx-auto grid max-w-[1600px] gap-2 px-6 py-16 md:grid-cols-2 md:px-12 lg:py-24">
          {v.spotlight.details.map((d, n) => (
            <figure key={d.label}>
              <div className="relative aspect-[16/8] overflow-hidden bg-midnight">
                <Image
                  src={a.setImage("spotlight-detail", n + 1)}
                  alt={d.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4 text-lg font-light text-white/80">{d.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Interior */}
      <section className="bg-white">
        <div className="relative aspect-[4/5] w-full md:aspect-[16/8]">
          <Image
            src={a.image("cabin")}
            alt={v.interior.cabinAlt}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,20,31,0.8),transparent_55%)]"
          />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1600px] px-6 pb-10 text-white md:px-12 md:pb-16">
            <h2 className={H2}>{v.interior.title}</h2>
            <p className={`mt-5 max-w-xl text-white/85 ${BODY}`}>{v.interior.text}</p>
          </div>
        </div>

        <div className="mx-auto grid max-w-[1600px] gap-10 px-6 py-20 md:grid-cols-2 md:gap-x-2 md:gap-y-16 md:px-12 lg:py-32">
          {v.interior.clips.map((c, n) => (
            <figure key={c.title}>
              <div className="relative aspect-[16/10] overflow-hidden bg-midnight">
                <Clip slug={v.slug} slot={n === 0 ? "clip-1" : "clip-2"} label={c.label} />
              </div>
              <figcaption className="mt-5">
                <h3 className="text-2xl font-light tracking-tight">{c.title}</h3>
                <p className={`mt-2 max-w-md text-midnight/75 ${BODY}`}>{c.text}</p>
              </figcaption>
            </figure>
          ))}
          {v.interior.features.map((f, n) => (
            <figure key={f.title}>
              <div className="relative aspect-[16/10] overflow-hidden bg-midnight">
                <Image
                  src={a.setImage("feature", n + 1)}
                  alt={f.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-5">
                <h3 className="text-2xl font-light tracking-tight">{f.title}</h3>
                <p className={`mt-2 max-w-md text-midnight/75 ${BODY}`}>{f.text}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Technology and safety */}
      <section className="bg-stone px-6 py-24 md:px-12 lg:py-40">
        <div className="mx-auto max-w-[1600px]">
          <h2 className={`${H2} max-w-3xl`}>{v.safety.title}</h2>
          <div className="mt-16 space-y-20 lg:mt-24 lg:space-y-32">
            {v.safety.items.map((f, n) => (
              <article key={f.title} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-20">
                <div
                  className={`relative aspect-[2/1] overflow-hidden bg-midnight ${
                    n % 2 ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={a.setImage("safety", n + 1)}
                    alt={f.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className={H3}>{f.title}</h3>
                  <p className={`mt-4 max-w-md text-midnight/80 ${BODY}`}>{f.text}</p>
                </div>
              </article>
            ))}

            <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-20">
              <div
                className={`relative aspect-[2/1] overflow-hidden bg-midnight ${
                  v.safety.items.length % 2 ? "lg:order-2" : ""
                }`}
              >
                <Clip slug={v.slug} slot="safety-clip" label={v.safety.clip.label} />
              </div>
              <div>
                <h3 className={H3}>{v.safety.clip.title}</h3>
                <p className={`mt-4 max-w-md text-midnight/80 ${BODY}`}>{v.safety.clip.text}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="relative overflow-hidden bg-midnight text-white">
        <Clip slug={v.slug} slot="tour" label={v.experience.label} />
        <div aria-hidden className="absolute inset-0 bg-midnight/70" />
        <div className="relative mx-auto max-w-[1600px] px-6 py-24 md:px-12 lg:py-40">
          <h2 className={`${H2} max-w-3xl`}>{v.experience.title}</h2>
          <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-2 lg:gap-24">
            {v.experience.items.map((i) => (
              <div key={i.title}>
                <h3 className="text-2xl font-light tracking-tight">{i.title}</h3>
                <p className={`mt-4 max-w-md text-white/80 ${BODY}`}>{i.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing call to action */}
      <section className="relative flex min-h-[80svh] items-end overflow-hidden bg-midnight text-white">
        <Image
          src={a.image("closing")}
          alt={v.closing.alt}
          fill
          sizes="100vw"
          className="object-cover object-[50%_70%]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,20,31,0.85),rgba(5,20,31,0.15)_60%)]"
        />
        <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-14 md:px-12 md:pb-20">
          <h2 className={`${H2} max-w-3xl`}>{v.closing.title}</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <Soon label="Book a test drive" className="btn btn-light">
              Book a test drive
            </Soon>
            <Soon label="Find a showroom" className="btn btn-light">
              Find a showroom
            </Soon>
          </div>
          <p className="mt-10 max-w-2xl text-sm font-light text-white/60">
            Features, colours and equipment vary by trim and market. Images are for illustration.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
