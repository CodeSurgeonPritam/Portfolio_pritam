import type { Metadata, Viewport } from "next";
import {
  Sora,
  Bricolage_Grotesque,
  Space_Grotesk,
  Outfit,
  DM_Sans,
  Jura,
  Fraunces,
  Instrument_Serif,
  Inter,
  Geist_Mono,
} from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Preloader from "@/components/ui/Preloader";
import Cursor from "@/components/ui/Cursor";
import { profile } from "@/lib/data";

// Display fonts — all preloaded; the FontSwitcher swaps between them live.
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const jura = Jura({
  variable: "--font-jura",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fontVars = [
  sora.variable,
  bricolage.variable,
  spaceGrotesk.variable,
  outfit.variable,
  dmSans.variable,
  jura.variable,
  fraunces.variable,
  instrument.variable,
  inter.variable,
  geistMono.variable,
].join(" ");

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050505",
};

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.tagline,
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontVars} antialiased`}
    >
      <body suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var f=localStorage.getItem('display-font');if(f)document.documentElement.dataset.font=f;var a=localStorage.getItem('accent');if(a)document.documentElement.dataset.accent=a;}catch(e){}",
          }}
        />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Preloader />
        <Cursor />
        <SmoothScroll>
          <Navbar />
          <ScrollProgress />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
