import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Satvic Movement | Portfolio",
  description: "I do not use social media. Visit my profile to see my portfolio.",
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
