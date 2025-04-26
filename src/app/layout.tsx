import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster"; // Import Toaster
import { Navbar } from "@/components/layout/navbar"; // Import Navbar

export const metadata: Metadata = {
  title: "ScrollSAGE",
  description: "Funky article reading experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Navbar /> {/* Add Navbar */}
            <main className="flex-grow"> {/* Ensure main content takes up remaining space */}
              {children}
            </main>
            <Toaster /> {/* Add Toaster for notifications */}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
