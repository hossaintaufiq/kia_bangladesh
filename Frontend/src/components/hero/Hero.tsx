"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import HeroCanvas, { type StageSlide } from "./HeroCanvas";
import { Soon } from "../ComingSoon";
import { useIntroDone } from "../intro/IntroProvider";

const SLIDES = [
  {
    image: "/kia/vehicle-2.webp",
    title: "A new era of electric",
    text: "From the compact EV2 to the family-sized EV9, one lineup for every kind of journey.",
    cta: "Explore the EV lineup",
  },
  {
    image: "/kia/brand-background.webp",
    video: "/kia-video/main-feature-ev-lineup.mp4",
    title: "Movement that inspires",
    text: "The power of movement to unlock new ideas and endless possibilities.",
    cta: "Who we are",
  },
  {
    image: "/kia/vehicle-background.webp",
    title: "Meet the Kia PV7",
    text: "A first look at the next purpose-built vehicle from Kia.",
    cta: "Watch the premiere",
  },
];

const INTERVAL = 8000;
const STAGE: StageSlide[] = SLIDES.map(({ image, video }) => ({ image, video }));
const pad = (n: number) => String(n).padStart(2, "0");

export default function Hero() {
  const [i, setI] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const reduce = !!useReducedMotion();
  const introDone = useIntroDone();

  // Slides start rotating only after the chapter intro has left the screen.
  useEffect(() => {
    if (reduce || !introDone) return;
    const t = setTimeout(() => setI((n) => (n + 1) % SLIDES.length), INTERVAL);
    return () => clearTimeout(t);
  }, [i, reduce, introDone]);

  const slide = SLIDES[i];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured"
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-midnight text-white"
    >
      {/* Static first frame: shows instantly, and stays if WebGL is unavailable */}
      <Image
        src={failed ? slide.image : SLIDES[0].image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {!failed && (
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          <HeroCanvas
            slides={STAGE}
            index={i}
            reducedMotion={reduce}
            onReady={() => setReady(true)}
            onFail={() => setFailed(true)}
          />
        </motion.div>
      )}

      {/* Legibility: darken the top for the header and the bottom for the headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,20,31,0.55)_0%,rgba(5,20,31,0)_20%,rgba(5,20,31,0.12)_38%,rgba(5,20,31,0.62)_66%,rgba(5,20,31,0.9)_100%)]"
      />

      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-10 px-6 pb-10 md:px-12 md:pb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-h-[15.5rem] max-w-3xl md:min-h-[17rem]" aria-live="polite">
            <AnimatePresence mode="wait">
              {introDone && (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h1 className="text-[clamp(2.6rem,6.4vw,6rem)] font-light leading-[1.02] tracking-[-0.025em]">
                    {slide.title}
                  </h1>
                  <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-white/85 md:text-xl">
                    {slide.text}
                  </p>
                  <Soon
                    label={slide.cta}
                    className="btn btn-light mt-8"
                  >
                    {slide.cta}
                  </Soon>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Slide selector: one line per slide, the active one fills as time runs out */}
          <div className="flex items-end gap-5">
            <div className="flex w-full gap-3 lg:w-auto" role="group" aria-label="Choose slide">
              {SLIDES.map((s, n) => (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => setI(n)}
                  aria-label={`Show slide ${n + 1}: ${s.title}`}
                  aria-current={n === i}
                  className="group flex-1 py-4 lg:w-24 lg:flex-none"
                >
                  <span className="relative block h-px w-full bg-white/35">
                    {n === i && introDone && (
                      <motion.span
                        key={`fill-${i}`}
                        className="absolute inset-y-0 left-0 block h-[2px] w-full origin-left -translate-y-px bg-white"
                        initial={{ scaleX: reduce ? 1 : 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: reduce ? 0 : INTERVAL / 1000, ease: "linear" }}
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>
            <p className="hidden shrink-0 whitespace-nowrap pb-3.5 text-sm tabular-nums text-white/80 lg:block">
              {pad(i + 1)} / {pad(SLIDES.length)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
