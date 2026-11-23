"use client";

import Logo from "../Logo";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Full-screen intro for Kia Bangladesh.
 * The KIA Bangladesh lockup appears first, then "Movement that inspires" builds
 * left to right beneath it, word by word, over a hairline progress bar. When the
 * bar completes the midnight curtain lifts to reveal the page.
 * Mounted once by IntroProvider, so it only plays on first load / refresh.
 * Scroll lock + scrollbar hiding live in globals.css (html:has([data-intro])).
 * Only transform + opacity are animated; sizes use clamp() to stay responsive.
 */

const WORDS = ["Movement", "that", "inspires"];
const FIRST = 700; // ms before the first word
const STEP = 900; // ms between words
const DRIVE = 3.6; // s: progress bar length, and how long the words stay
const LOGO_HOLD = 900; // ms everything stays after the bar completes
const EASE = [0.22, 1, 0.36, 1] as const;
const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const;
const BAR_EASE = [0.65, 0, 0.35, 1] as const;

type Props = {
  /** Called once the curtain has fully left the screen. */
  onComplete: () => void;
};

export default function ChapterIntro({ onComplete }: Props) {
  const [count, setCount] = useState(0); // words shown so far
  const [leaving, setLeaving] = useState(false);

  // Skip entirely for visitors who prefer reduced motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) onComplete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timers: number[] = [];
    WORDS.forEach((_, i) => {
      timers.push(window.setTimeout(() => setCount(i + 1), FIRST + STEP * i));
    });
    timers.push(window.setTimeout(() => setLeaving(true), DRIVE * 1000 + LOGO_HOLD));
    return () => timers.forEach(window.clearTimeout);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!leaving && (
        <motion.div
          aria-hidden="true"
          data-intro
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-midnight text-white will-change-transform"
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 1, ease: CURTAIN_EASE } }}
        >
          {/* KIA Bangladesh lockup comes first */}
          <motion.div
            className="flex items-center gap-[clamp(0.75rem,2vw,1.25rem)]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <Logo className="!h-[clamp(2rem,4.8vw,3.25rem)]" />
            <motion.span
              className="h-[clamp(2rem,4.4vw,2.9rem)] w-px origin-center bg-white/40"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.6, ease: CURTAIN_EASE, delay: 0.15 }}
            />
            <span className="text-[clamp(1.05rem,2.6vw,1.65rem)] font-light leading-none tracking-[0.14em] uppercase">
              Bangladesh
            </span>
          </motion.div>

          {/* Hairline progress, in step with the words */}
          <div className="mt-6 h-px w-[min(14rem,60vw)] overflow-hidden bg-white/15">
            <motion.div
              className="h-full origin-left bg-kia-red will-change-transform"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: DRIVE, ease: BAR_EASE }}
            />
          </div>

          {/* Motto builds left to right below the red line */}
          <div className="mt-[clamp(1.25rem,3vw,2rem)] flex w-full items-baseline justify-center gap-[0.45em] overflow-hidden whitespace-nowrap px-4 text-[clamp(1.1rem,2.6vw,1.75rem)] font-light leading-none tracking-wide text-white/85">
            {WORDS.map((word, i) => (
              <motion.span
                key={word}
                className="select-none will-change-transform"
                initial={{ opacity: 0, x: -18 }}
                animate={count > i ? { opacity: 1, x: 0 } : { opacity: 0, x: -18 }}
                transition={{ duration: 1.1, ease: EASE }}
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
