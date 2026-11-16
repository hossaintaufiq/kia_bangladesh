import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ComingSoonProvider } from "@/components/ComingSoon";
import Header from "@/components/Header";
import { IntroProvider } from "@/components/intro/IntroProvider";

// Kia Signature, supplied from Kia International's brand resources.
const kia = localFont({
  src: [
    { path: "../../public/fonts/KiaSignatureLight.woff2", weight: "300", style: "normal" },
    { path: "../../public/fonts/KiaSignatureRegular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/KiaSignatureBold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-kia",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kia Bangladesh | Movement that inspires",
  description:
    "Kia Bangladesh. Explore Kia's electric, hybrid and purpose-built vehicles, design and innovation.",
};

export const viewport: Viewport = {
  themeColor: "#05141f",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={kia.variable}>
      <body>
        <ComingSoonProvider>
          <IntroProvider>
            <Header />
            {children}
          </IntroProvider>
        </ComingSoonProvider>
      </body>
    </html>
  );
}
