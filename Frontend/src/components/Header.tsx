"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Logo from "./Logo";
import { Soon, useComingSoon } from "./ComingSoon";
import { NAV, NAV_LEFT, NAV_RIGHT } from "@/lib/content";

export default function Header() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(false);
  const [vehicles, setVehicles] = useState(false);
  const soon = useComingSoon();
  const pathname = usePathname();
  const router = useRouter();

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
        onMouseLeave={() => setVehicles(false)}
        onKeyDown={(e) => e.key === "Escape" && setVehicles(false)}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,color] duration-500 ${
          vehicles ? "bg-white text-midnight" : "text-white"
        } ${
          vehicles ? "" : solid || menu ? "bg-midnight/80 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-6 xl:grid xl:grid-cols-[1fr_auto_1fr] md:h-[84px] md:px-12">
          <button
            type="button"
            aria-label={pathname === "/" ? "Kia, back to top" : "Kia, home"}
            onClick={() =>
              pathname === "/" ? window.scrollTo({ top: 0, behavior: "smooth" }) : router.push("/")
            }
            className="-m-2 p-2 xl:order-2"
          >
            <Logo />
          </button>

          <nav aria-label="Primary" className="hidden xl:order-1 xl:block">
            <ul className="flex items-center gap-10">
              {NAV_LEFT.map((item) => (
                <li key={item}>
                  {item === "Vehicles" ? (
                    <button
                      type="button"
                      aria-expanded={vehicles}
                      aria-controls="vehicles-menu"
                      onMouseEnter={() => setVehicles(true)}
                      onFocus={() => setVehicles(true)}
                      onClick={() => setVehicles((v) => !v)}
                      className="link-draw pb-1 text-[17px] font-bold"
                    >
                      {item}
                    </button>
                  ) : (
                    <Soon
                      label={item}
                      onMouseEnter={() => setVehicles(false)}
                      className="link-draw pb-1 text-[17px] font-bold"
                    >
                      {item}
                    </Soon>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center justify-end gap-10 xl:order-3">
            <nav aria-label="Secondary" className="hidden xl:block">
              <ul className="flex items-center gap-10">
                {NAV_RIGHT.map((item) => (
                  <li key={item}>
                    <Soon
                      label={item}
                      className="link-draw pb-1 text-[17px] font-bold"
                    >
                      {item}
                    </Soon>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              <Soon
                label="Book a test drive"
                className={`btn btn-md !hidden md:!inline-flex ${vehicles ? "btn-dark" : "btn-light"}`}
              >
                Book a test drive
              </Soon>
              <button
                type="button"
                onClick={() => setMenu((m) => !m)}
                aria-expanded={menu}
                aria-controls="mobile-menu"
                className="relative -mr-2 flex h-11 w-11 items-center justify-center xl:hidden"
              >
                <span className="sr-only">
                  {menu ? "Close menu" : "Open menu"}
                </span>
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
        </div>

        {vehicles && (
          <div
            id="vehicles-menu"
            className="absolute inset-x-0 top-full hidden border-t border-midnight/20 bg-white text-midnight xl:block"
          >
            <div className="mx-auto max-w-[1600px] px-12 py-10">
              <p className="text-[13px] text-midnight">SUV</p>
              <ul className="mt-4 flex gap-8">
                <li>
                  <Link
                    href="/vehicles/seltos"
                    onClick={() => setVehicles(false)}
                    className="group block w-[240px] text-left"
                  >
                    <Image
                      src="/kia/seltos-nav.webp"
                      alt=""
                      width={240}
                      height={97}
                      className="h-auto w-[240px]"
                    />
                    <span className="mt-4 block text-[15px] font-bold group-hover:underline group-focus-visible:underline">
                      Seltos
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
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
            className="fixed inset-0 z-40 flex flex-col bg-midnight px-6 pb-10 pt-28 text-white xl:hidden"
          >
            <ul className="flex flex-1 flex-col justify-center gap-2">
              {NAV.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.08 + i * 0.05,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
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
                  {item === "Vehicles" && (
                    <Link
                      href="/vehicles/seltos"
                      onClick={() => setMenu(false)}
                      className="block py-1 pl-4 text-left text-xl font-bold"
                    >
                      Seltos
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => {
                setMenu(false);
                soon("Book a test drive");
              }}
              className="btn btn-light w-full"
            >
              Book a test drive
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
