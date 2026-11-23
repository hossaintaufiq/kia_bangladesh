import type { Metadata } from "next";
import { notFound } from "next/navigation";
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

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const v = getVehicle(slug);
  if (!v) notFound();
  return <VehiclePage vehicle={v} />;
}
