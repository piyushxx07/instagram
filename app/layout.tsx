import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Satvic Movement",
  description: "Satvic Movement",
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
