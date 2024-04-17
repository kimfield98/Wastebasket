import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const Pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "kimfield world",
  description: "my personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={Pretendard.className}>{children}</body>
    </html>
  );
}
