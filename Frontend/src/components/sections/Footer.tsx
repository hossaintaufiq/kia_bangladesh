import { Soon } from "../ComingSoon";
import Logo from "../Logo";
import { FOOTER_GROUPS, LEGAL, SOCIAL } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-midnight px-6 pb-10 pt-24 text-white md:px-12 md:pt-32">
      <div className="mx-auto max-w-[1600px]">
        <p className="max-w-4xl text-[clamp(2.2rem,5vw,5rem)] font-light leading-[1.04] tracking-[-0.025em]">
          Movement that inspires
        </p>

        <div className="mt-20 grid gap-12 border-t border-white/15 pt-14 sm:grid-cols-2 lg:grid-cols-4">
          {FOOTER_GROUPS.map((g) => (
            <nav key={g.title} aria-label={g.title}>
              <p className="mb-5 text-lg">{g.title}</p>
              <ul className="space-y-3">
                {g.links.map((l) => (
                  <li key={l}>
                    <Soon label={l} className="link-draw pb-0.5 text-base font-light text-white/70 hover:text-white">
                      {l}
                    </Soon>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-20 flex flex-col gap-8 border-t border-white/15 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <Logo />
            <Soon
              label="Choose your country"
              className="rounded-full border border-white/30 px-5 py-2 text-sm font-light transition-colors hover:border-white"
            >
              Bangladesh, English
            </Soon>
          </div>
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            {SOCIAL.map((s) => (
              <li key={s}>
                <Soon label={s} className="link-draw pb-0.5 text-sm font-light text-white/70 hover:text-white">
                  {s}
                </Soon>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-4 text-sm font-light text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Kia Bangladesh. Images and videos courtesy of Kia Corporation.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL.map((l) => (
              <li key={l}>
                <Soon label={l} className="link-draw pb-0.5 hover:text-white">
                  {l}
                </Soon>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
