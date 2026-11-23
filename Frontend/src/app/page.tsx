import Hero from "@/components/hero/Hero";
import Intro from "@/components/sections/Intro";
import Lineup from "@/components/sections/Lineup";
import Premiere from "@/components/sections/Premiere";
import Design from "@/components/sections/Design";
import Brand from "@/components/sections/Brand";
import Innovation from "@/components/sections/Innovation";
import Cta from "@/components/sections/Cta";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Intro />
      <Lineup />
      <Premiere />
      <Design />
      <Brand />
      <Innovation />
      <Cta />
      <Footer />
    </main>
  );
}
