/**
 * Kia logo. Rendered as a mask so it takes the surrounding text colour
 * (white on the dark header, midnight on the white one), as the style guide requires.
 */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Kia"
      className={`block aspect-[365/95] h-7 bg-current md:h-8 ${className}`}
      style={{
        WebkitMask: "url(/brand/kia-logo.png) center / contain no-repeat",
        mask: "url(/brand/kia-logo.png) center / contain no-repeat",
      }}
    />
  );
}
