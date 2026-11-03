
import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
 

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Somaj",
  description: "Social Development Events Platform",
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
      className={`${josefinSans.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <Toaster
            position="top-center"
            richColors
            closeButton
            duration={5000}
            theme="system"
          />
          <Navbar/>

          <main className="flex-1">
            {children}
          </main>
           <Footer/>
        </ThemeProvider>

      </body>
    </html>
  );
}
