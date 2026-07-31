import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteOrigin, siteUrl, withBasePath } from "@/lib/base-path";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  // Required so the image paths below resolve to absolute URLs — crawlers
  // reject relative ones. Note that Next does *not* apply `basePath` to
  // metadata URLs, so those paths are prefixed explicitly via `withBasePath`.
  metadataBase: new URL(siteOrigin),
  title: {
    default: "Junjie Li \u2014 Senior Product Manager at Microsoft",
    template: "%s | Junjie Li",
  },
  description:
    "Senior Product Manager at Microsoft CoreAI. Building AI developer tools that reach 1M+ developers.",
  authors: [{ name: "Junjie Li" }],
  keywords: ["product manager", "Microsoft", "AI Toolkit", "developer tools", "VS Code", "CoreAI"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Junjie Li",
    title: "Junjie Li \u2014 Senior Product Manager at Microsoft",
    description: "Building AI developer tools that reach 1M+ developers.",
    images: [
      {
        url: withBasePath("/images/ai-toolkit-hero-new.png"),
        width: 1920,
        height: 1280,
        alt: "Junjie Li \u2014 AI Toolkit for VS Code",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Junjie Li \u2014 Senior Product Manager at Microsoft",
    description: "Building AI developer tools that reach 1M+ developers.",
    images: [withBasePath("/images/ai-toolkit-hero-new.png")],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');if(t==='light')document.documentElement.classList.add('light')})();`,
          }}
        />
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased flex flex-col min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
