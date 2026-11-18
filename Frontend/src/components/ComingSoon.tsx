"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

type Open = (label: string) => void;

const Ctx = createContext<Open>(() => {});

export const useComingSoon = () => useContext(Ctx);

/** A button that opens the "coming soon" dialog for the given page. */
export function Soon({
  label,
  className,
  children,
  ...rest
}: {
  label: string;
  className?: string;
  children: ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "type" | "className" | "children">) {
  const open = useComingSoon();
  return (
    <button type="button" className={className} onClick={() => open(label)} {...rest}>
      {children}
    </button>
  );
}

export function ComingSoonProvider({ children }: { children: ReactNode }) {
  const [label, setLabel] = useState<string | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const open = useCallback<Open>((l) => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setLabel(l);
  }, []);

  const close = useCallback(() => {
    setLabel(null);
    returnFocus.current?.focus?.();
  }, []);

  useEffect(() => {
    if (!label) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      // Only one focusable element in the dialog, so keep focus on it.
      if (e.key === "Tab") {
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [label, close]);

  return (
    <Ctx.Provider value={open}>
      {children}
      <AnimatePresence>
        {label && (
          <motion.div
            key="soon"
            className="fixed inset-0 z-[100] flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute inset-0 bg-midnight/70 backdrop-blur-md"
              onClick={close}
              aria-hidden
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="soon-title"
              className="relative w-full max-w-lg bg-white p-10 text-midnight shadow-2xl md:p-14"
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 12, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p id="soon-title" className="text-4xl font-light leading-tight tracking-tight md:text-5xl">
                {label}
              </p>
              <p className="mt-5 max-w-sm text-pretty text-lg leading-relaxed text-ash">
                This page is coming soon. We&apos;re building it now.
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className="btn btn-dark mt-10"
              >
                Back to home
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
