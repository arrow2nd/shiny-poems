import React from "react";

import "styles/globals.css";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="flex flex-col min-h-screen bg-neutral-white">
        {children}
      </body>
    </html>
  );
}
