import type { Metadata } from "next";
import { Inter } from "next/font/google";
import QueryProvider from "./utils/QueryProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "React cat image viewer",
  description: "Unlimited cats",
  openGraph: {
    title: "React cat image viewer",
    description: "Unlimited cats",
    url: "somefakecatviewersite.com",
    siteName: "Cat image viewer",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          crossOrigin="anonymous"
          src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        ></script>
      </head>
      <body className={inter.className}>
        <QueryProvider>
          <main role="main">{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}
