import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Best Web Development Agency | AI Web App Builder",
  description: "Looking for the best web development agency in India? We are a custom web development agency offering ecommerce web development and AI web app builder services near you.",
  keywords: "Web Development, web development agency, web development agency in bangalore, web development agency near me, ecommerce web development agency, web development agency in pune, web development agency in Ahmedabad, web development agency in delhi, custom web development agency, web development agency in india, web development agency in Noida, best web development agency, best web development agency in india, ai web app builder, free ai web app builder, ai web app creator, ai web app developer",
  openGraph: {
    title: "Best Web Development Agency | AI Web App Builder",
    description: "Looking for the best web development agency in India? We are a custom web development agency offering ecommerce web development and AI web app builder services near you.",
    url: "https://yourwebsite.com",
    siteName: "Web Development Agency",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Web Development Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Web Development Agency | AI Web App Builder",
    description: "Looking for the best web development agency in India? We are a custom web development agency offering ecommerce web development and AI web app builder services near you.",
    images: ["https://yourwebsite.com/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@300,400,500,700,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} font-sans bg-background text-foreground antialiased min-h-screen flex flex-col`} suppressHydrationWarning>
        <SmoothScroll>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
