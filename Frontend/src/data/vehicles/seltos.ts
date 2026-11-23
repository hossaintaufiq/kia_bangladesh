import type { Vehicle } from "./types.ts";

export const seltos: Vehicle = {
  slug: "seltos",
  name: "Seltos",
  tagline: "The SUV that awakens your true self.",
  summary: "A bold SUV with a wide-screen cockpit and technology that looks out for you.",
  metaDescription:
    "Explore the Kia Seltos in 360°. See its design, colours, interior, technology and safety.",
  heroAlt: "Dark Kia Seltos parked on a city street at dusk",
  navAlt: "Kia Seltos in white, front three-quarter view",

  intro: {
    title: ["Where practicality", "meets style"],
    body: [
      "Seltos is the SUV that inspires passion in every moment. Its bold, upright presence sets the stage for a journey toward your most authentic self.",
      "Turn it through a full circle below and pick the colour that is yours.",
    ],
  },

  design: {
    filmLabel: "Kia Seltos film",
    title: ["Solid SUV silhouette,", "refined details"],
    text: "Sharp vertical lighting, flush door handles and graphic wheels give the Seltos a look that is unmistakably its own.",
    details: [
      {
        title: "A confident front face",
        text: "A broad grille and upright lines give the Seltos real presence.",
        alt: "Front of the Seltos with its wide grille",
      },
      {
        title: "Vertical LED headlamps",
        text: "A signature light pattern you can spot from far away.",
        alt: "Close-up of the Seltos headlamp",
      },
      {
        title: "Flush door handles",
        text: "Handles sit level with the body for a clean, smooth side.",
        alt: "Flush door handle on the Seltos",
      },
      {
        title: "Graphic alloy wheels",
        text: "Bold wheel designs finish the stance.",
        alt: "Alloy wheel on the Seltos",
      },
    ],
  },

  colours: {
    title: "Six colours, every angle",
    frames: 72,
    zoom: 0.85,
    items: [
      { key: "white", name: "Glacier White Pearl", swatch: "#eceeef" },
      { key: "silver", name: "Ivory Silver Gloss", swatch: "#b4b7ba" },
      { key: "frost", name: "Frost Blue", swatch: "#7ea3b8" },
      { key: "blue", name: "Imperial Blue", swatch: "#1c2a6b" },
      { key: "grey", name: "Gravity Gray", swatch: "#3d4348" },
      { key: "black", name: "Aurora Black Pearl", swatch: "#15181a" },
    ],
  },

  spotlight: {
    title: "Always connected",
    text: "Your Seltos stays within reach, with your phone as the key and alerts when you need them.",
    alt: "Seltos on a city street with a phone showing a surround-view camera",
    details: [
      { label: "Digital key", alt: "Phone held to the Seltos door handle" },
      { label: "Alerts on your phone", alt: "Phone showing a vehicle alert on a map" },
    ],
  },

  interior: {
    title: "A space reimagined for your lifestyle",
    text: "Step inside and a wide, flowing display opens up a calm, spacious cockpit.",
    cabinAlt: "Seltos cockpit with a wide display and digital instrument cluster",
    clips: [
      {
        title: "Panoramic sunroof",
        text: "Open the cabin to the sky and let the light in.",
        label: "View through the Seltos panoramic sunroof",
      },
      {
        title: "Comfortable seating",
        text: "Supportive front seats keep every journey easy.",
        label: "Seltos front seats",
      },
    ],
    features: [
      {
        title: "Premium Bose sound",
        text: "Rich, clear audio turns every drive into a performance.",
        alt: "Bose speaker in the Seltos door",
      },
      {
        title: "Wireless phone charging",
        text: "Set your phone down and it charges, with no cable needed.",
        alt: "Phone charging wirelessly in the Seltos console",
      },
      {
        title: "Adjustable comfort",
        text: "Seat controls put the perfect position at your fingertips.",
        alt: "Seltos front seat with comfort controls",
      },
      {
        title: "Flexible rear seats",
        text: "Fold the rear seat down to make room for what matters.",
        alt: "Seltos rear seat folded flat",
      },
    ],
  },

  safety: {
    title: "Technology that looks out for you",
    items: [
      {
        title: "Keeping your distance",
        text: "Smart cruise control helps you keep a safe gap to the vehicle ahead.",
        alt: "Seltos following a vehicle ahead at a steady distance",
      },
      {
        title: "Airbag protection",
        text: "Airbags work together with the body structure to protect occupants.",
        alt: "Seltos with an airbag cutaway",
      },
      {
        title: "A strong foundation",
        text: "A rigid body structure is built to protect everyone on board.",
        alt: "Seltos body structure and chassis",
      },
      {
        title: "Surround view",
        text: "A top-down camera view helps you park with confidence.",
        alt: "Seltos surround view monitor with parking guide lines",
      },
    ],
    clip: {
      title: "Aware when you reverse",
      text: "Sensors alert you to people and objects around the car as you pull out.",
      label: "Seltos detecting a pedestrian while reversing out of a parking space",
    },
  },

  experience: {
    label: "Inside the Kia Seltos",
    title: "The moment you reconnect with your true self",
    items: [
      {
        title: "Moments of serenity amid life's rush",
        text: "Premium sound, a wide cockpit and a calm cabin turn every drive into time for yourself.",
      },
      {
        title: "A long-awaited adventure, a new challenge",
        text: "Flexible seating and generous space make packing easy when the road calls.",
      },
    ],
  },

  closing: {
    title: "With Seltos, you become the protagonist in every moment",
    alt: "Seltos driving on a city road",
  },
};
