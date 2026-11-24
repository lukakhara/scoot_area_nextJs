// lib/contact.ts
export const PHONE_DISPLAY = "+995 55 55 55";
export const PHONE_E164 = "+995555555";
export const EMAIL = "Scootarea@info.ge";
export const ADDRESS = "რუსთაველის გამზ. 10, თბილისი, საქართველო";

// TODO: replace with your real pages
export const SOCIAL_URLS = {
  facebook: "https://www.facebook.com/scootarea",
  youtube: "https://www.youtube.com/@scootarea",
  instagram: "https://www.instagram.com/scootarea",
  linkedin: "https://www.linkedin.com/company/scootarea",
  telegram: "https://t.me/scootarea",
} as const;

export const googleMapsUrl = (address: string = ADDRESS) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;