import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import VehiclePage from "@/components/vehicle/VehiclePage";
import { VEHICLES, getVehicle } from "@/data/vehicles";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return VEHICLES.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const v = getVehicle(slug);
  if (!v) return {};
  return { title: `Kia ${v.name} | Kia Bangladesh`, description: v.metaDescription };
}

async function Vehicle({ params }: Props) {
  const { slug } = await params;
  const v = getVehicle(slug);
  if (!v) notFound();
  return <VehiclePage vehicle={v} />;
}

// Reading params happens inside Suspense so every listed vehicle is prerendered
// and an unknown address still resolves to the not-found page.
export default function Page({ params }: Props) {
  return (
    <Suspense fallback={<div className="min-h-[100svh] bg-midnight" />}>
      <Vehicle params={params} />
    </Suspense>
  );
}
