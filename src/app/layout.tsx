import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MovieVibe - Your Ultimate Cinematic Experience",
  description: "Explore the latest trending movies, top-rated blockbusters, search your favorites, filter by genre, and read complete movie details. Experience the best cinematic UI.",
  keywords: ["movies", "cinematic", "trending movies", "the movie database", "tmdb", "netflix clone", "imdb clone", "movie detail search"],
  openGraph: {
    title: "MovieVibe - Your Ultimate Cinematic Experience",
    description: "Explore the latest trending movies, top-rated blockbusters, search your favorites, and read complete details.",
    type: "website",
    siteName: "MovieVibe",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
