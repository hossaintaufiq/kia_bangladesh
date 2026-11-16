"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Logo from "./Logo";
import { Soon, useComingSoon } from "./ComingSoon";
import { NAV } from "@/lib/content";

export default function Header() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(false);
  const soon = useComingSoon();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 48);
    setHidden(y > prev && y > 260 && !menu);
  });

  useEffect(() => {
    if (!menu) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 text-white transition-[background-color,backdrop-filter] duration-500 ${
          solid || menu ? "bg-midnight/80 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-6 md:h-[84px] md:px-12">
          <button
            type="button"
            aria-label="Kia Bangladesh, back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="-m-2 p-2"
          >
            <Logo />
          </button>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-10">
              {NAV.map((item) => (
                <li key={item}>
                  <Soon label={item} className="link-draw pb-1 text-[0.95rem] tracking-wide">
                    {item}
                  </Soon>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Soon
              label="Book a test drive"
              className="hidden rounded-full bg-kia-red px-6 py-2.5 text-[0.95rem] text-white transition-colors duration-300 hover:bg-kia-red-deep md:inline-block"
            >
              Book a test drive
            </Soon>
            <button
              type="button"
              onClick={() => setMenu((m) => !m)}
              aria-expanded={menu}
              aria-controls="mobile-menu"
              className="relative -mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <span className="sr-only">{menu ? "Close menu" : "Open menu"}</span>
              <span
                aria-hidden
                className={`absolute h-px w-6 bg-white transition-transform duration-500 ease-premium ${
                  menu ? "rotate-45" : "-translate-y-[5px]"
                }`}
              />
              <span
                aria-hidden
                className={`absolute h-px w-6 bg-white transition-transform duration-500 ease-premium ${
                  menu ? "-rotate-45" : "translate-y-[5px]"
                }`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div
            id="mobile-menu"
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 flex flex-col bg-midnight px-6 pb-10 pt-28 text-white lg:hidden"
          >
            <ul className="flex flex-1 flex-col justify-center gap-2">
              {NAV.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setMenu(false);
                      soon(item);
                    }}
                    className="py-2 text-left text-[2.6rem] font-light leading-tight tracking-tight"
                  >
                    {item}
                  </button>
                </motion.li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => {
                setMenu(false);
                soon("Book a test drive");
              }}
              className="rounded-full bg-kia-red px-7 py-4 text-lg text-white"
            >
              Book a test drive
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
