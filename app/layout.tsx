import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mockup Factory - Create Your Product Mockups",
  description: "Easily create stunning product mockups with Mockup Factory. Upload your designs and generate professional mockups in seconds. Perfect for showcasing your products online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
