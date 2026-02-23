import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "💖 AI Waifu - Your Terminal Companion",
  description: "A cute AI waifu companion that lives in your browser!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
