
import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google"; // Import Inter and Orbitron
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/layout/navbar";
import { cn } from "@/lib/utils"; // Import cn utility

// Initialize fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans", // Keep Inter as the main sans font
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ['400', '700'], // Load necessary weights
  variable: "--font-orbitron", // Define CSS variable for Orbitron
});


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
      {/* Add font variables and transition class */}
      <body
        className={cn(
          "font-sans antialiased transition-colors duration-300 ease-in-out",
          inter.variable, // Apply Inter variable
          orbitron.variable // Apply Orbitron variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false} // Enable smooth transitions
        >
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

