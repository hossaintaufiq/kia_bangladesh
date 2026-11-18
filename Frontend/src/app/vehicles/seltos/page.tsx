import type { Metadata } from "next";
import Image from "next/image";
import { Soon } from "@/components/ComingSoon";
import ColourPicker from "@/components/seltos/ColourPicker";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Kia Seltos | Kia Bangladesh",
  description:
    "Where practicality meets style, Seltos is the SUV that inspires passion in every moment. Explore its design, colours, interior, technology and safety.",
};

const IMG = (n: string) => `/kia/seltos/${n}.webp`;

const H2 = "text-[clamp(2rem,3.8vw,3.75rem)] font-light leading-[1.05] tracking-[-0.02em]";
const BODY = "text-lg font-light leading-relaxed";

const SAFETY = [
  {
    title: "Driver assistance",
    text: "Advanced driver assistance systems help you stay aware of the road around you.",
    src: "adas",
    alt: "Black Seltos parked beside a building",
    ratio: "aspect-[4/3]",
  },
  {
    title: "Front collision warning",
    text: "Sensors watch the road ahead and warn you when a vehicle in front puts you at risk.",
    src: "collision",
    alt: "Black Seltos on a bridge with a collision warning graphic",
    ratio: "aspect-[3/2]",
  },
  {
    title: "Map and system updates over the air",
    text: "Navigation and system updates arrive wirelessly, so your Seltos stays current.",
    src: "ota",
    alt: "Gray Seltos parked in front of a building",
    ratio: "aspect-[1800/827]",
  },
];

export default function SeltosPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-midnight text-white">
        <Image
          src={IMG("hero")}
          alt="Kia Seltos parked beneath a row of concrete arches"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[40%_60%]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,20,31,0.85)_0%,rgba(5,20,31,0.1)_55%,rgba(5,20,31,0.35)_100%)]"
        />
        <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-14 md:px-12 md:pb-20">
          <h1 className="text-[clamp(4rem,13vw,13rem)] font-light leading-[0.9] tracking-[-0.04em]">
            Seltos
          </h1>
          <p className="mt-6 max-w-2xl text-[clamp(1.25rem,2vw,1.9rem)] font-light leading-snug">
            The SUV that awakens your true self.
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
            Where practicality
            <br />
            meets style
          </h2>
          <div className={`max-w-xl space-y-6 text-midnight/80 ${BODY}`}>
            <p>
              Seltos is the SUV that inspires passion in every moment. Its bold, captivating
              presence sets the stage for a journey toward your most authentic self.
            </p>
            <p>With Seltos, every drive goes beyond transportation, making your day complete.</p>
          </div>
        </div>
      </section>

      {/* Design */}
      <section className="bg-stone px-6 py-24 md:px-12 lg:py-40">
        <div className="mx-auto max-w-[1600px]">
          <div className="relative aspect-[3/2] w-full overflow-hidden md:aspect-[16/9]">
            <Image
              src={IMG("silhouette")}
              alt="Kia Seltos in teal on a tree-lined road"
              fill
              sizes="(min-width: 1600px) 1500px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="mt-12 grid gap-8 lg:mt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
            <h2 className={H2}>
              Solid SUV silhouette,
              <br />
              refined details
            </h2>
            <p className={`max-w-xl text-midnight/80 ${BODY}`}>
              Dynamic welcome lighting greets you with a signature glow, while flush door handles
              blend seamlessly into the body.
            </p>
          </div>

          <div className="mt-24 grid gap-3 md:grid-cols-2 md:gap-2 lg:mt-36">
            {[
              { src: "road", alt: "Kia Seltos in red on a coastal road" },
              { src: "desert", alt: "Kia Seltos in red on a desert road" },
            ].map((p) => (
              <div key={p.src} className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={IMG(p.src)}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
            <h3 className="text-[clamp(1.5rem,2.2vw,2.2rem)] font-light leading-tight tracking-tight">
              Designed for the full spectrum of life
            </h3>
            <p className={`max-w-xl text-midnight/80 ${BODY}`}>
              From city streets to open landscapes, Seltos moves with you through the new normal of
              living.
            </p>
          </div>
        </div>
      </section>

      {/* Colours */}
      <section className="bg-white px-6 py-24 md:px-12 lg:py-40">
        <div className="mx-auto max-w-[1300px]">
          <h2 className={`${H2} mx-auto max-w-3xl text-center`}>
            Seven colours, perfected by nature
          </h2>
          <div className="mt-12 lg:mt-20">
            <ColourPicker />
          </div>
        </div>
      </section>

      {/* Interior */}
      <section className="bg-midnight text-white">
        <div className="relative aspect-[4/5] w-full md:aspect-[16/8]">
          <Image
            src={IMG("interior")}
            alt="Seltos cockpit with a wide display and a digital instrument cluster"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,20,31,0.8),transparent_55%)]"
          />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1600px] px-6 pb-10 md:px-12 md:pb-16">
            <h2 className={H2}>A space reimagined for your lifestyle</h2>
            <p className={`mt-5 max-w-xl text-white/85 ${BODY}`}>
              Step inside, and a wide display framed by clean horizontal lines opens up a calm,
              spacious interior.
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-[1600px] gap-10 px-6 py-20 md:grid-cols-2 md:gap-x-2 md:gap-y-16 md:px-12 lg:py-32">
          <figure>
            <div className="relative aspect-[16/10] overflow-hidden bg-midnight">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src="/kia-video/seltos-panoramic-sunroof.mp4"
                poster={IMG("sunroof")}
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                aria-label="View through the Seltos panoramic sunroof"
              />
            </div>
            <figcaption className="mt-5">
              <h3 className="text-2xl font-light tracking-tight">Panoramic sunroof</h3>
              <p className={`mt-2 max-w-md text-white/75 ${BODY}`}>
                Open the cabin to the sky and let the light in.
              </p>
            </figcaption>
          </figure>
          <figure>
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={IMG("cabin")}
                alt="Seltos front cabin with ambient lighting"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-5">
              <h3 className="text-2xl font-light tracking-tight">Ambient lighting</h3>
              <p className={`mt-2 max-w-md text-white/75 ${BODY}`}>
                A soft glow across the cabin sets the mood for time of your own.
              </p>
            </figcaption>
          </figure>
          <figure className="md:col-span-2">
            <div className="grid items-center gap-8 md:grid-cols-[minmax(0,420px)_1fr] md:gap-16">
              <div className="relative aspect-[900/695] overflow-hidden">
                <Image
                  src={IMG("climate")}
                  alt="Seltos climate control panel"
                  fill
                  sizes="(min-width: 768px) 420px, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption>
                <h3 className="text-2xl font-light tracking-tight">
                  Fully automatic air conditioner
                </h3>
                <p className={`mt-2 max-w-md text-white/75 ${BODY}`}>
                  Set the temperature once and the cabin stays right.
                </p>
              </figcaption>
            </div>
          </figure>
        </div>
      </section>

      {/* Technology and safety */}
      <section className="bg-white px-6 py-24 md:px-12 lg:py-40">
        <div className="mx-auto max-w-[1600px]">
          <h2 className={`${H2} max-w-3xl`}>Technology that looks out for you</h2>
          <div className="mt-16 space-y-20 lg:mt-24 lg:space-y-32">
            {SAFETY.map((f, n) => (
              <article key={f.title} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-20">
                <div className={`relative overflow-hidden ${f.ratio} ${n % 2 ? "lg:order-2" : ""}`}>
                  <Image
                    src={IMG(f.src)}
                    alt={f.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-[clamp(1.6rem,2.6vw,2.6rem)] font-light leading-tight tracking-tight">
                    {f.title}
                  </h3>
                  <p className={`mt-4 max-w-md text-midnight/80 ${BODY}`}>{f.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="relative overflow-hidden bg-midnight text-white">
        <Image src={IMG("dome")} alt="" fill sizes="100vw" className="object-cover" />
        <div aria-hidden className="absolute inset-0 bg-midnight/70" />
        <div className="relative mx-auto max-w-[1600px] px-6 py-24 md:px-12 lg:py-40">
          <h2 className={`${H2} max-w-3xl`}>The moment you reconnect with your true self</h2>
          <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-2 lg:gap-24">
            <div>
              <h3 className="text-2xl font-light tracking-tight">
                Moments of serenity amid life&apos;s rush
              </h3>
              <p className={`mt-4 max-w-md text-white/80 ${BODY}`}>
                Premium sound, a fold-down second-row seat, the panoramic sunroof and ambient
                lighting turn the cabin into a place to slow down.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-light tracking-tight">
                A long-awaited adventure, a new challenge
              </h3>
              <p className={`mt-4 max-w-md text-white/80 ${BODY}`}>
                A power tailgate and generous cargo space make packing easy, and Terrain Mode
                adjusts the power to 4WD when the road gets rough.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing call to action */}
      <section className="relative flex min-h-[80svh] items-end overflow-hidden bg-midnight text-white">
        <Image
          src={IMG("range")}
          alt="Three Kia Seltos parked under a flyover"
          fill
          sizes="100vw"
          className="object-cover object-[50%_75%]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,20,31,0.85),rgba(5,20,31,0.15)_60%)]"
        />
        <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-14 md:px-12 md:pb-20">
          <h2 className={`${H2} max-w-3xl`}>
            With Seltos, you become the protagonist in every moment
          </h2>
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
