// Every link on the home page points to a page that doesn't exist yet.
// Labels here are what the "coming soon" dialog shows.

export const NAV = ["Vehicles", "Brand", "Design", "Innovation", "Owners", "Newsroom"] as const;

export const FOOTER_GROUPS: { title: string; links: string[] }[] = [
  { title: "Vehicles", links: ["Electric", "Hybrid", "Purpose built vehicles", "Compare models"] },
  { title: "Discover", links: ["Who we are", "Brand heritage", "Design", "Innovation", "Newsroom"] },
  { title: "Owners", links: ["Book a service", "Warranty", "Accessories", "Roadside assistance"] },
  { title: "Kia Bangladesh", links: ["Showrooms", "Contact us", "Careers", "Book a test drive"] },
];

export const SOCIAL = ["Instagram", "Facebook", "YouTube", "LinkedIn"];

export const LEGAL = ["Privacy policy", "Terms of use", "Cookie settings"];
