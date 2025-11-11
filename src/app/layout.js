import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const space_grotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nexar Tech Solutions | Building the Digital Future of Ethiopia",
  description:
    "Nexar Tech Solutions is a leading Ethiopian technology company delivering innovative digital solutions including web app development, digital marketing, branding, and media production. We are committed to building the digital future of Ethiopia.",
  keywords: [
    "Nexar Tech Solutions",
    "Ethiopia software company",
    "web development Ethiopia",
    "digital marketing Ethiopia",
    "branding agency Addis Ababa",
    "IT solutions Ethiopia",
    "E-commerce website Ethiopia",
    "SEO Ethiopia",
    "video production Ethiopia",
  ],
  authors: [{ name: "Nexar Tech Solutions Marketing Management Team" }],
  creator: "Nexar Tech Solutions",
  publisher: "Nexar Tech Solutions",

  openGraph: {
    title: "Nexar Tech Solutions | Building the Digital Future of Ethiopia",
    description:
      "We design and deliver innovative, reliable, and future-ready digital solutions for businesses and institutions of all sizes.",
    url: "https://www.nexartechsolution.com",
    siteName: "Nexar Tech Solutions",
    images: [
      {
        url: "/photo/nexar.png",
        width: 1200,
        height: 630,
        alt: "Nexar Tech Solutions - Building the Digital Future of Ethiopia",
      },
    ],
    locale: "en_ET",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Nexar Tech Solutions | Building the Digital Future of Ethiopia",
    description:
      "Empowering businesses through web development, digital marketing, branding, and media production in Ethiopia.",
    images: ["/photo/nexar.png"],
    creator: "@nexartech",
  },

  icons: {
    icon: "/photo/nexar.png", // favicon
    shortcut: "/photo/nexar.png",
    apple: "/photo/nexar.png",
  },

  metadataBase: new URL("https://www.nexartechsolution.com"),
  category: "Technology & Digital Solutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${space_grotesk.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
