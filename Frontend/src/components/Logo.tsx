/**
 * Placeholder wordmark set in Kia Signature.
 * Swap this for the official Kia logo SVG from Kia International's brand package
 * (put it in /public/brand and render it here) before launch.
 */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline ${className}`}>
      <span className="text-[1.65rem] font-bold leading-none tracking-[0.14em]">KIA</span>
    </span>
  );
}
