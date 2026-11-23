import { seltos } from "./seltos.ts";
import { sonet } from "./sonet.ts";
import type { Vehicle } from "./types.ts";

/** Order here is the order shown in menus and on the vehicles list. */
export const VEHICLES: readonly Vehicle[] = [seltos, sonet];

export const getVehicle = (slug: string) => VEHICLES.find((v) => v.slug === slug);
