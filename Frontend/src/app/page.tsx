import Hero from "@/components/hero/Hero";
import Intro from "@/components/sections/Intro";
import Lineup from "@/components/sections/Lineup";
import { VEHICLES } from "@/data/vehicles";
import { vehicleAssets } from "@/data/vehicles/assets";
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
      <Lineup
        vehicles={VEHICLES.map((v) => ({
          slug: v.slug,
          name: v.name,
          summary: v.summary,
          image: vehicleAssets(v.slug).image("hero"),
        }))}
      />
      <Premiere />
      <Design />
      <Brand />
      <Innovation />
      <Cta />
      <Footer />
    </main>
  );
}
