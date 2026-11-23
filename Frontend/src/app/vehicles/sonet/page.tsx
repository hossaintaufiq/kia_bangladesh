import type { Metadata } from "next";
import Image from "next/image";
import { Soon } from "@/components/ComingSoon";
import ColourPicker from "@/components/seltos/ColourPicker";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Kia Sonet | Kia Bangladesh",
  description:
    "Explore the Kia Sonet in 360°. See its design, colours, interior, technology and safety.",
};

const IMG = (n: string) => `/kia/sonet/${n}.webp`;
const VID = (n: string) => `/kia-video/sonet-${n}.mp4`;

const H2 = "text-[clamp(2rem,3.8vw,3.75rem)] font-light leading-[1.05] tracking-[-0.02em]";
const BODY = "text-lg font-light leading-relaxed";

const FOLDER = "/kia/sonet/360";
const FRAMES = 72;

const COLOURS = [
  { name: "Glacier White Pearl", file: "white", swatch: "#eceeef" },
  { name: "Gravity Grey", file: "grey", swatch: "#4b5a5b" },
  { name: "Imperial Blue", file: "blue", swatch: "#1c2f6b" },
  { name: "Aurora Black Pearl", file: "black", swatch: "#15181a" },
] as const;

const DETAILS = [
  {
    src: "grille",
    title: "Signature tiger-nose grille",
    text: "A bold face with sharp, star-map lighting.",
    alt: "Close-up of the Sonet grille and headlamps in blue",
  },
  {
    src: "taillamp",
    title: "Connected tail lamps",
    text: "A single light bar ties the rear together.",
    alt: "Rear light bar of a blue Sonet",
  },
  {
    src: "wheel",
    title: "Sculpted alloy wheels",
    text: "Sharp, graphic wheels finish the stance.",
    alt: "Alloy wheel of a blue Sonet",
  },
  {
    src: "foglamp",
    title: "LED fog lamps",
    text: "Neat lighting set low in the bumper.",
    alt: "Front fog lamp of a blue Sonet",
  },
];

const FEATURES = [
  {
    src: "infotainment",
    title: "Premium sound and a wide display",
    text: "Bose audio and a clear touchscreen keep every drive entertaining.",
    alt: "Sonet infotainment screen with Bose branding",
  },
  {
    src: "ventilated",
    title: "Ventilated front seats",
    text: "Cooling airflow keeps you comfortable on long, warm days.",
    alt: "Sonet front seats with airflow graphics",
  },
  {
    src: "wireless",
    title: "Wireless phone charging",
    text: "Set your phone down and it charges, with no cable needed.",
    alt: "Phone charging wirelessly in the Sonet console",
  },
  {
    src: "steering",
    title: "Steering wheel controls",
    text: "Audio, calls and cruise control stay within thumb's reach.",
    alt: "Sonet steering wheel with the Kia logo",
  },
];

const SAFETY = [
  {
    title: "Watching for pedestrians",
    text: "Sensors scan ahead and warn you when someone steps into your path.",
    src: "adas-1",
    alt: "Sonet detecting pedestrians crossing the road",
  },
  {
    title: "Front collision warning",
    text: "If a vehicle ahead slows suddenly, the Sonet alerts you early.",
    src: "adas-2",
    alt: "Sonet detecting a vehicle ahead on a coastal road",
  },
  {
    title: "Looking out for cyclists",
    text: "The system keeps an eye on cyclists sharing the road with you.",
    src: "adas-3",
    alt: "Sonet detecting a cyclist beside the road",
  },
  {
    title: "Airbag protection",
    text: "Airbags work together with the body structure to protect occupants.",
    src: "airbags",
    alt: "White Sonet with an airbag cutaway",
  },
];

type ClipProps = { name: string; label: string };
function Clip({ name, label }: ClipProps) {
  return (
    <video
      className="absolute inset-0 h-full w-full object-cover"
      src={VID(name)}
      poster={IMG(`poster-${name}`)}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
    />
  );
}

export default function SonetPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-midnight text-white">
        <Image
          src={IMG("hero")}
          alt="Red Kia Sonet on a forest road"
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
            Sonet
          </h1>
          <p className="mt-6 max-w-2xl text-[clamp(1.25rem,2vw,1.9rem)] font-light leading-snug">
            Compact in size. Bold in everything else.
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
            Small footprint,
            <br />
            big presence
          </h2>
          <div className={`max-w-xl space-y-6 text-midnight/80 ${BODY}`}>
            <p>
              The Sonet packs a confident SUV stance, a technology-rich cabin and thoughtful safety
              features into a size that suits the city.
            </p>
            <p>Turn it through a full circle below and pick the colour that is yours.</p>
          </div>
        </div>
      </section>

      {/* Design */}
      <section className="bg-stone px-6 py-24 md:px-12 lg:py-40">
        <div className="mx-auto max-w-[1600px]">
          <div className="relative aspect-[3/2] w-full overflow-hidden bg-midnight md:aspect-[16/9]">
            <Clip name="film" label="Kia Sonet film" />
          </div>
          <div className="mt-12 grid gap-8 lg:mt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
            <h2 className={H2}>
              A sharper look,
              <br />
              down to the details
            </h2>
            <p className={`max-w-xl text-midnight/80 ${BODY}`}>
              From the grille to the tail lamps, every line on the Sonet is drawn to make a
              statement on the road.
            </p>
          </div>

          <div className="mt-20 grid gap-x-2 gap-y-12 md:grid-cols-2 lg:mt-32">
            {DETAILS.map((d) => (
              <figure key={d.src}>
                <div className="relative aspect-[16/8] overflow-hidden bg-white">
                  <Image
                    src={IMG(d.src)}
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

      {/* Colours + 360 */}
      <section className="bg-white px-6 py-24 md:px-12 lg:py-40">
        <div className="mx-auto max-w-[1300px]">
          <h2 className={`${H2} mx-auto max-w-4xl text-center`}>Four colours, every angle</h2>
          <div className="mt-12 lg:mt-20">
            <ColourPicker
              model="Sonet"
              colours={COLOURS}
              folderBase={FOLDER}
              stillBase={null}
              frames={FRAMES}
              zoom={0.72}
            />
          </div>
        </div>
      </section>

      {/* X-Line */}
      <section className="relative overflow-hidden bg-midnight text-white">
        <div className="relative aspect-[4/5] w-full md:aspect-[16/8]">
          <Image
            src={IMG("xline")}
            alt="Sonet X-Line in matte grey on an industrial street"
            fill
            sizes="100vw"
            className="object-cover object-[50%_65%]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,20,31,0.85),transparent_60%)]"
          />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1600px] px-6 pb-10 md:px-12 md:pb-16">
            <h2 className={H2}>Sonet X-Line</h2>
            <p className={`mt-5 max-w-xl text-white/85 ${BODY}`}>
              A darker, sportier take on the Sonet, with its own grille and graphic wheels.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-[1600px] gap-2 px-6 py-16 md:grid-cols-2 md:px-12 lg:py-24">
          {[
            { src: "xline-grille", alt: "Sonet X-Line grille", label: "X-Line grille" },
            { src: "xline-wheel", alt: "Sonet X-Line alloy wheel", label: "X-Line alloy wheel" },
          ].map((p) => (
            <figure key={p.src}>
              <div className="relative aspect-[16/8] overflow-hidden bg-midnight">
                <Image
                  src={IMG(p.src)}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4 text-lg font-light text-white/80">{p.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Interior */}
      <section className="bg-white">
        <div className="relative aspect-[4/5] w-full md:aspect-[16/8]">
          <Image
            src={IMG("cabin")}
            alt="Sonet cockpit with a wide display and digital cluster"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,20,31,0.8),transparent_55%)]"
          />
          <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1600px] px-6 pb-10 text-white md:px-12 md:pb-16">
            <h2 className={H2}>A cabin that feels a class above</h2>
            <p className={`mt-5 max-w-xl text-white/85 ${BODY}`}>
              Step inside to a driver-focused cockpit with a clear display and everything within
              easy reach.
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-[1600px] gap-10 px-6 py-20 md:grid-cols-2 md:gap-x-2 md:gap-y-16 md:px-12 lg:py-32">
          <figure>
            <div className="relative aspect-[16/10] overflow-hidden bg-midnight">
              <Clip name="sunroof" label="View through the Sonet sunroof" />
            </div>
            <figcaption className="mt-5">
              <h3 className="text-2xl font-light tracking-tight">Sunroof</h3>
              <p className={`mt-2 max-w-md text-midnight/75 ${BODY}`}>
                Open the cabin to the sky and let the light in.
              </p>
            </figcaption>
          </figure>
          <figure>
            <div className="relative aspect-[16/10] overflow-hidden bg-midnight">
              <Clip name="ambient" label="Sonet ambient lighting in the door" />
            </div>
            <figcaption className="mt-5">
              <h3 className="text-2xl font-light tracking-tight">Ambient lighting</h3>
              <p className={`mt-2 max-w-md text-midnight/75 ${BODY}`}>
                A soft glow across the cabin sets the mood for every drive.
              </p>
            </figcaption>
          </figure>
          {FEATURES.map((f) => (
            <figure key={f.src}>
              <div className="relative aspect-[16/10] overflow-hidden bg-midnight">
                <Image
                  src={IMG(f.src)}
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
          <h2 className={`${H2} max-w-3xl`}>Technology that looks out for you</h2>
          <div className="mt-16 space-y-20 lg:mt-24 lg:space-y-32">
            {SAFETY.map((f, n) => (
              <article key={f.title} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-20">
                <div
                  className={`relative aspect-[2/1] overflow-hidden bg-midnight ${
                    n % 2 ? "lg:order-2" : ""
                  }`}
                >
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

            <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-20">
              <div className="relative aspect-[2/1] overflow-hidden bg-midnight">
                <Clip name="camera" label="Sonet rear camera with parking guide" />
              </div>
              <div>
                <h3 className="text-[clamp(1.6rem,2.6vw,2.6rem)] font-light leading-tight tracking-tight">
                  Parking made easier
                </h3>
                <p className={`mt-4 max-w-md text-midnight/80 ${BODY}`}>
                  A camera view with guide lines helps you slip into tight spaces with confidence.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="relative overflow-hidden bg-midnight text-white">
        <Clip name="tour" label="A tour of the Kia Sonet" />
        <div aria-hidden className="absolute inset-0 bg-midnight/70" />
        <div className="relative mx-auto max-w-[1600px] px-6 py-24 md:px-12 lg:py-40">
          <h2 className={`${H2} max-w-3xl`}>Made for the way you move</h2>
          <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-2 lg:gap-24">
            <div>
              <h3 className="text-2xl font-light tracking-tight">Easy in the city</h3>
              <p className={`mt-4 max-w-md text-white/80 ${BODY}`}>
                Compact dimensions and a high seating position make busy streets and tight parking
                feel simple.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-light tracking-tight">Ready for the weekend</h3>
              <p className={`mt-4 max-w-md text-white/80 ${BODY}`}>
                When the road opens up, a comfortable cabin and confident handling keep every
                journey enjoyable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing call to action */}
      <section className="relative flex min-h-[80svh] items-end overflow-hidden bg-midnight text-white">
        <Image
          src={IMG("range")}
          alt="Three Kia Sonet models parked in front of a building"
          fill
          sizes="100vw"
          className="object-cover object-[50%_70%]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,20,31,0.85),rgba(5,20,31,0.15)_60%)]"
        />
        <div className="relative mx-auto w-full max-w-[1600px] px-6 pb-14 md:px-12 md:pb-20">
          <h2 className={`${H2} max-w-3xl`}>Ready to see the Sonet in person?</h2>
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
