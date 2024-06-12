import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./components/NavigationBar";

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
        <NavBar />
        {children}
      </body>
    </html>
  );
}
