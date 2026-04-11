import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
    default: "Junjie Li — Senior Product Manager at Microsoft",
    template: "%s | Junjie Li",
  },
  description:
    "Senior Product Manager at Microsoft CoreAI. Building developer tools that empower millions. Career, tech, and life.",
  authors: [{ name: "Junjie Li" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Junjie Li",
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
            __html: `
              (function() {
                var theme = localStorage.getItem('theme');
                if (theme === 'light') {
                  document.documentElement.classList.add('light');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
