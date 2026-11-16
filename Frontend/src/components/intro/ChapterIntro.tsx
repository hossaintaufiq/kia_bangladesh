"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Full-screen intro for Kia Bangladesh.
 * "Movement that inspires" builds up left to right, word by word, over a hairline
 * progress bar. The words stay until the bar completes, then give way
 * to the KIA Bangladesh lockup and the midnight curtain lifts to reveal the page.
 * Mounted once by IntroProvider, so it only plays on first load / refresh.
 * Scroll lock + scrollbar hiding live in globals.css (html:has([data-intro])).
 * Only transform + opacity are animated; sizes use clamp() to stay responsive.
 */

const WORDS = ["Movement", "that", "inspires"];
const FIRST = 350; // ms before the first word
const STEP = 600; // ms between words
const DRIVE = 2.4; // s: progress bar length, and how long the words stay
const LOGO_HOLD = 1500; // ms the lockup stays before the curtain lifts
const EASE = [0.22, 1, 0.36, 1] as const;
const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const;
const BAR_EASE = [0.65, 0, 0.35, 1] as const;

type Props = {
  /** Called once the curtain has fully left the screen. */
  onComplete: () => void;
};

export default function ChapterIntro({ onComplete }: Props) {
  const [count, setCount] = useState(0); // words shown so far
  const [showLogo, setShowLogo] = useState(false);
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
    timers.push(window.setTimeout(() => setShowLogo(true), DRIVE * 1000));
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
          <div className="flex h-[clamp(3.75rem,7.5vw,5.25rem)] w-full items-center justify-center overflow-hidden px-4">
            <AnimatePresence mode="wait" initial={false}>
              {!showLogo ? (
                <motion.div
                  key="words"
                  className="flex items-baseline gap-[0.45em] whitespace-nowrap text-[clamp(1.75rem,4.4vw,2.9rem)] font-light leading-none tracking-wide"
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  {WORDS.map((word, i) => (
                    <motion.span
                      key={word}
                      className="select-none will-change-transform"
                      initial={{ opacity: 0, x: -18 }}
                      animate={count > i ? { opacity: 1, x: 0 } : { opacity: 0, x: -18 }}
                      transition={{ duration: 0.85, ease: EASE }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="lockup"
                  className="flex items-center gap-[clamp(0.75rem,2vw,1.25rem)]"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: EASE }}
                >
                  <span className="text-[clamp(2.5rem,6vw,4rem)] font-bold leading-none tracking-[0.14em]">
                    KIA
                  </span>
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
              )}
            </AnimatePresence>
          </div>

          {/* Hairline progress, in step with the words */}
          <div className="mt-6 h-px w-[min(14rem,60vw)] overflow-hidden bg-white/15">
            <motion.div
              className="h-full origin-left bg-kia-red will-change-transform"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: DRIVE, ease: BAR_EASE }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
