"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import ChapterIntro from "./ChapterIntro";

const IntroContext = createContext({ done: true });

/** True once the chapter intro has finished (or was skipped). */
export const useIntroDone = () => useContext(IntroContext).done;

/**
 * Plays the chapter intro once per page load and tells the rest of the page when
 * it's over, so the hero can start its own entrance afterwards.
 * (The intro itself skips straight to "done" for visitors who prefer reduced motion.)
 */
export function IntroProvider({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false);

  return (
    <IntroContext.Provider value={{ done }}>
      {children}
      {!done && <ChapterIntro onComplete={() => setDone(true)} />}
    </IntroContext.Provider>
  );
}
