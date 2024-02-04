import { Analytics } from "@vercel/analytics/react";
import React from "react";
import "styles/globals.css";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="flex min-h-screen flex-col bg-neutral-white">
        {children}
      </body>
      <Analytics />
    </html>
  );
}
