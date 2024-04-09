import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local'

const Pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: "밥버디",
  description: "점심/저녁 랜덤매칭 플랫폼 밥버디",
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
