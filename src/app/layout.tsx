import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import { ThemeToggle } from "@/components/ThemeToggle";
import { noFlashThemeScript } from "@/lib/theme";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Blog",
  description: "Thoughts and explainers on artificial intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script id="set-theme" strategy="beforeInteractive">
          {noFlashThemeScript()}
        </Script>
        <header className="border-b border-black/[.08] dark:border-white/[.145]">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              AI Blog
            </Link>
            <nav className="flex items-center gap-4">
              <Link
                href="/archive"
                className="text-sm text-zinc-600 hover:underline dark:text-zinc-300"
              >
                Archive
              </Link>
              <Link
                href="/tags"
                className="text-sm text-zinc-600 hover:underline dark:text-zinc-300"
              >
                Tags
              </Link>
              <ThemeToggle />
            </nav>
          </div>
        </header>
        <div className="flex flex-1 flex-col">{children}</div>
      </body>
    </html>
  );
}
