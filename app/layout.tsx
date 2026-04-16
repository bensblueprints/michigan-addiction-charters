import type { Metadata } from "next";
import { Cormorant, Montserrat, Permanent_Marker } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const marker = Permanent_Marker({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-marker",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://michiganaddiction.advancedmarketing.co"),
  title: "Michigan Addiction Charters | Premier Lake Michigan Fishing Charters in Algoma, WI",
  description:
    "Captain Shawn's 35 years on Lake Michigan. Private sportfishing charters for Salmon, Steelhead, and Lake Trout out of Algoma, Wisconsin. 38' Chris Craft, up to 6 guests.",
  keywords: [
    "Algoma fishing charter",
    "Lake Michigan fishing charter",
    "Wisconsin salmon fishing",
    "Chinook salmon charter",
    "Michigan Addiction Charters",
    "Captain Shawn Algoma",
  ],
  openGraph: {
    title: "Michigan Addiction Charters | Algoma, WI",
    description:
      "35 years chasing trophy Salmon, Steelhead & Lake Trout out of Algoma, WI. Private charters aboard a 38' Chris Craft.",
    images: ["/images/boat-hero.jpg"],
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable} ${marker.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Michigan Addiction Charters",
              image: "https://michiganaddiction.advancedmarketing.co/images/boat-hero.jpg",
              telephone: "+1-920-784-3038",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Algoma",
                addressRegion: "WI",
                addressCountry: "US",
              },
              geo: { "@type": "GeoCoordinates", latitude: 44.6089, longitude: -87.4326 },
              description:
                "Private Lake Michigan sportfishing charters targeting Chinook Salmon, Steelhead, and Lake Trout out of Algoma, Wisconsin.",
              areaServed: "Lake Michigan",
              sameAs: [],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
