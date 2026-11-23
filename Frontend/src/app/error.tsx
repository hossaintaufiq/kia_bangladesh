"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="flex min-h-[100svh] items-end bg-midnight px-6 pb-16 pt-40 text-white md:px-12 md:pb-24">
      <div className="mx-auto w-full max-w-[1600px]">
        <h1 className="text-[clamp(2.2rem,5vw,5rem)] font-light leading-[1.04] tracking-[-0.025em]">
          Something went wrong
        </h1>
        <p className="mt-4 max-w-md text-lg font-light leading-relaxed text-white/75">
          The page didn&apos;t load properly. Please try again.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={reset} className="btn btn-light">
            Try again
          </button>
          <Link href="/" className="btn btn-light">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
