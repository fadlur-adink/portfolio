import type { Metadata } from "next";
import { getLocale, getMessages } from "next-intl/server";
import ThemeRegistry from "@/lib/theme-registry";
import { siteConfig } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <ThemeRegistry messages={messages} locale={locale}>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
