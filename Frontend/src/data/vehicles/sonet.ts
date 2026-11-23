import type { Vehicle } from "./types.ts";

export const sonet: Vehicle = {
  slug: "sonet",
  name: "Sonet",
  tagline: "Compact in size. Bold in everything else.",
  summary: "A compact SUV with a confident stance and a technology-rich cabin.",
  metaDescription:
    "Explore the Kia Sonet in 360°. See its design, colours, interior, technology and safety.",
  heroAlt: "Red Kia Sonet on a forest road",
  navAlt: "Kia Sonet in white, front three-quarter view",

  intro: {
    title: ["Small footprint,", "big presence"],
    body: [
      "The Sonet packs a confident SUV stance, a technology-rich cabin and thoughtful safety features into a size that suits the city.",
      "Turn it through a full circle below and pick the colour that is yours.",
    ],
  },

  design: {
    filmLabel: "Kia Sonet film",
    title: ["A sharper look,", "down to the details"],
    text: "From the grille to the tail lamps, every line on the Sonet is drawn to make a statement on the road.",
    details: [
      {
        title: "Signature tiger-nose grille",
        text: "A bold face with sharp, star-map lighting.",
        alt: "Close-up of the Sonet grille and headlamps in blue",
      },
      {
        title: "Connected tail lamps",
        text: "A single light bar ties the rear together.",
        alt: "Rear light bar of a blue Sonet",
      },
      {
        title: "Sculpted alloy wheels",
        text: "Sharp, graphic wheels finish the stance.",
        alt: "Alloy wheel of a blue Sonet",
      },
      {
        title: "LED fog lamps",
        text: "Neat lighting set low in the bumper.",
        alt: "Front fog lamp of a blue Sonet",
      },
    ],
  },

  colours: {
    title: "Four colours, every angle",
    frames: 72,
    zoom: 0.72,
    items: [
      { key: "white", name: "Glacier White Pearl", swatch: "#eceeef" },
      { key: "grey", name: "Gravity Grey", swatch: "#4b5a5b" },
      { key: "blue", name: "Imperial Blue", swatch: "#1c2f6b" },
      { key: "black", name: "Aurora Black Pearl", swatch: "#15181a" },
    ],
  },

  spotlight: {
    title: "Sonet X-Line",
    text: "A darker, sportier take on the Sonet, with its own grille and graphic wheels.",
    alt: "Sonet X-Line in matte grey on an industrial street",
    details: [
      { label: "X-Line grille", alt: "Sonet X-Line grille" },
      { label: "X-Line alloy wheel", alt: "Sonet X-Line alloy wheel" },
    ],
  },

  interior: {
    title: "A cabin that feels a class above",
    text: "Step inside to a driver-focused cockpit with a clear display and everything within easy reach.",
    cabinAlt: "Sonet cockpit with a wide display and digital cluster",
    clips: [
      {
        title: "Sunroof",
        text: "Open the cabin to the sky and let the light in.",
        label: "View through the Sonet sunroof",
      },
      {
        title: "Ambient lighting",
        text: "A soft glow across the cabin sets the mood for every drive.",
        label: "Sonet ambient lighting in the door",
      },
    ],
    features: [
      {
        title: "Premium sound and a wide display",
        text: "Bose audio and a clear touchscreen keep every drive entertaining.",
        alt: "Sonet infotainment screen with Bose branding",
      },
      {
        title: "Ventilated front seats",
        text: "Cooling airflow keeps you comfortable on long, warm days.",
        alt: "Sonet front seats with airflow graphics",
      },
      {
        title: "Wireless phone charging",
        text: "Set your phone down and it charges, with no cable needed.",
        alt: "Phone charging wirelessly in the Sonet console",
      },
      {
        title: "Steering wheel controls",
        text: "Audio, calls and cruise control stay within thumb's reach.",
        alt: "Sonet steering wheel with the Kia logo",
      },
    ],
  },

  safety: {
    title: "Technology that looks out for you",
    items: [
      {
        title: "Watching for pedestrians",
        text: "Sensors scan ahead and warn you when someone steps into your path.",
        alt: "Sonet detecting pedestrians crossing the road",
      },
      {
        title: "Front collision warning",
        text: "If a vehicle ahead slows suddenly, the Sonet alerts you early.",
        alt: "Sonet detecting a vehicle ahead on a coastal road",
      },
      {
        title: "Looking out for cyclists",
        text: "The system keeps an eye on cyclists sharing the road with you.",
        alt: "Sonet detecting a cyclist beside the road",
      },
      {
        title: "Airbag protection",
        text: "Airbags work together with the body structure to protect occupants.",
        alt: "White Sonet with an airbag cutaway",
      },
    ],
    clip: {
      title: "Parking made easier",
      text: "A camera view with guide lines helps you slip into tight spaces with confidence.",
      label: "Sonet rear camera with parking guide",
    },
  },

  experience: {
    label: "A tour of the Kia Sonet",
    title: "Made for the way you move",
    items: [
      {
        title: "Easy in the city",
        text: "Compact dimensions and a high seating position make busy streets and tight parking feel simple.",
      },
      {
        title: "Ready for the weekend",
        text: "When the road opens up, a comfortable cabin and confident handling keep every journey enjoyable.",
      },
    ],
  },

  closing: {
    title: "Ready to see the Sonet in person?",
    alt: "Three Kia Sonet models parked in front of a building",
  },
};
