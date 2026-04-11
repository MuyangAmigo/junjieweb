import { notFound } from "next/navigation";
import { locales, isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SetLang from "@/components/SetLang";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <SetLang locale={locale} />
      <Header locale={locale} dict={dict} />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
