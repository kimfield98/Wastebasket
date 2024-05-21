import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "leafris",
  description: "leafris",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-[100%] h-[100%]">
        {children}
      </body>
    </html>
  );
}
