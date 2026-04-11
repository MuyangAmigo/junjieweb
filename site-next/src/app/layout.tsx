import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    url: "https://junjie.li",
    siteName: "Junjie Li",
    title: "Junjie Li \u2014 Senior Product Manager at Microsoft",
    description: "Building AI developer tools that reach 1M+ developers.",
    images: [
      {
        url: "https://junjieblob.blob.core.windows.net/images/ai-toolkit-hero-new.png",
        width: 1200,
        height: 630,
        alt: "Junjie Li \u2014 AI Toolkit for VS Code",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Junjie Li \u2014 Senior Product Manager at Microsoft",
    description: "Building AI developer tools that reach 1M+ developers.",
    images: ["https://junjieblob.blob.core.windows.net/images/ai-toolkit-hero-new.png"],
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
