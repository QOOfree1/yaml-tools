import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YAML Tools",
  description: "Free online YAML tools — format, validate, and query YAML in your browser",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
