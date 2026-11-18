"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Soon } from "../ComingSoon";

export default function Premiere() {
  const ref = useRef<HTMLElement>(null);
  const reduce = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.55], [reduce ? 1 : 1.2, 1]);

  return (
    <section
      ref={ref}
      className="relative h-[92svh] min-h-[620px] overflow-hidden bg-midnight text-white"
    >
      <motion.video
        style={{ scale }}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay={!reduce}
        muted
        loop
        playsInline
        preload="metadata"
        poster="/kia/vehicle-background.webp"
        aria-hidden
      >
        <source src="/kia-video/main-feature-pv7.mp4" type="video/mp4" />
      </motion.video>
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(5,20,31,0.75)_0%,rgba(5,20,31,0.1)_60%)]"
      />
      <div className="relative mx-auto flex h-full max-w-[1600px] items-end px-6 pb-14 md:px-12 md:pb-24">
        <div className="max-w-2xl">
          <h2 className="text-[clamp(2.4rem,5.6vw,5.4rem)] font-light leading-[1.03] tracking-[-0.025em]">
            The Kia PV7 world premiere
          </h2>
          <p className="mt-6 max-w-lg text-lg font-light leading-relaxed text-white/85 md:text-xl">
            A new kind of vehicle, built around the space inside it.
          </p>
          <Soon
            label="Kia PV7"
            className="btn btn-light mt-9"
          >
            Watch the premiere
          </Soon>
        </div>
      </div>
    </section>
  );
}
