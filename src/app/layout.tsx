import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Game Test Grounds",
  description: "A test game for feasability of hex grid game in a browser",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={"no-scrollbar"}>
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
