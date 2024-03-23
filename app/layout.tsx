import React from "react";
import "styles/globals.css";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "05635d43b87d4e82a58cbbcb8ff3b1b5"}'
        ></script>
      </head>
      <body className="flex min-h-screen flex-col bg-neutral-white">
        {children}
      </body>
    </html>
  );
}
