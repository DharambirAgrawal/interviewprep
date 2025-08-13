import type { Metadata, Viewport } from "next";
import { SITE_NAME } from "@/lib/constants";

// Resolve site URL from env with safe fallback
const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
// Remove surrounding quotes, trailing slashes, and trailing /api if provided
const normalized = rawSiteUrl
  .toString()
  .trim()
  .replace(/^"|"$/g, "")
  .replace(/\/+$/, "")
  .replace(/\/api$/, "");
export const SITE_URL = normalized || "http://localhost:3000";

// Default Open Graph image(s)
export const DEFAULT_OG_IMAGES = [
  {
    url: `${SITE_URL}/landing/hero.webp`,
    width: 1200,
    height: 630,
    alt: `${SITE_NAME} – Ace Your Interviews with AI`,
  } as const,
];

export const DEFAULT_KEYWORDS = [
  "AI interview",
  "mock interview",
  "technical interview",
  "system design",
  "coding practice",
  "behavioral interview",
  "interview analytics",
  "prep platform",
  SITE_NAME,
];

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} – AI Interview Prep`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "AI-powered mock interviews, feedback, and analytics to help you land your next role.",
  keywords: DEFAULT_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} – AI Interview Prep`,
    description:
      "Mock interviews, real-time feedback, and performance insights for faster growth.",
    url: SITE_URL,
    images: DEFAULT_OG_IMAGES,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} – AI Interview Prep`,
    description:
      "Mock interviews, real-time feedback, and performance insights for faster growth.",
    images: DEFAULT_OG_IMAGES,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  category: "education",
  generator: "Next.js",
};

export const defaultViewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

// Helper to build per-page metadata with sane defaults
export function buildPageMetadata(input: Partial<Metadata>): Metadata {
  return {
    ...baseMetadata,
    ...input,
    openGraph: {
      ...baseMetadata.openGraph,
      ...input.openGraph,
      images: input.openGraph?.images ?? DEFAULT_OG_IMAGES,
    },
    twitter: {
      ...baseMetadata.twitter,
      ...input.twitter,
      images: input.twitter?.images ?? DEFAULT_OG_IMAGES,
    },
  };
}
