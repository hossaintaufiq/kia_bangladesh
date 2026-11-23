import Link from "next/link";
import Footer from "@/components/sections/Footer";

export default function NotFound() {
  return (
    <main>
      <section className="flex min-h-[80svh] items-end bg-midnight px-6 pb-16 pt-40 text-white md:px-12 md:pb-24">
        <div className="mx-auto w-full max-w-[1600px]">
          <p className="text-[clamp(5rem,16vw,14rem)] font-light leading-[0.9] tracking-[-0.04em]">
            404
          </p>
          <h1 className="mt-6 text-[clamp(1.5rem,2.6vw,2.6rem)] font-light leading-tight tracking-tight">
            We can&apos;t find that page
          </h1>
          <p className="mt-4 max-w-md text-lg font-light leading-relaxed text-white/75">
            It may have moved, or the address may be wrong.
          </p>
          <Link href="/" className="btn btn-light mt-8">
            Back to home
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
