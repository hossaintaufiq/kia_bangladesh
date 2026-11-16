"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "../Logo";

/**
 * Chapter intro for Kia Bangladesh.
 * A small card in the lower-left corner: the wordmark, then a slogan that rolls
 * word by word and lands on the brand name. Same idea as the ACM chapter intro,
 * dressed in Kia's palette (midnight card, Kia Signature type, red progress line).
 */

const WORDS = ["Movement", "that", "inspires", "Kia Bangladesh"];
const STEP = 460; // ms per word
const HOLD = 900; // ms the last word stays before the card leaves
const TOTAL = STEP * (WORDS.length - 1) + HOLD;

type Props = {
  /** Called when the card has finished leaving. */
  onComplete: () => void;
};

export default function ChapterIntro({ onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Visitors who prefer reduced motion skip the intro entirely.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete();
      return;
    }
    const timers: number[] = [];
    for (let i = 1; i < WORDS.length; i++) {
      timers.push(window.setTimeout(() => setIndex(i), STEP * i));
    }
    timers.push(window.setTimeout(() => setLeaving(true), TOTAL));
    return () => timers.forEach(window.clearTimeout);
    // Runs once; onComplete is only used for the reduced-motion shortcut.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!leaving && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed bottom-6 left-6 z-[90] overflow-hidden bg-midnight text-white shadow-[0_24px_60px_-20px_rgba(5,20,31,0.7)] md:bottom-12 md:left-12"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-5 px-6 py-5 md:gap-6 md:px-8 md:py-6">
            <Logo className="[&>span:last-child]:hidden" />
            <span className="h-8 w-px bg-white/25" />
            <div className="relative h-9 w-[12.5rem] overflow-hidden md:h-10 md:w-[15rem]">
              <AnimatePresence initial={false}>
                <motion.span
                  key={index}
                  className={`absolute inset-0 flex items-center whitespace-nowrap text-[1.55rem] leading-none tracking-tight md:text-[1.85rem] ${
                    index === WORDS.length - 1 ? "font-normal" : "font-light"
                  }`}
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                >
                  {WORDS[index]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
          {/* Progress: shows how long until the page is ready */}
          <div className="h-[2px] w-full bg-white/10">
            <motion.div
              className="h-full origin-left bg-kia-red"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: TOTAL / 1000, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
