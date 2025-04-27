
import type { Metadata } from "next";
// Import Poppins, Montserrat Alternates, and Orbitron
import { Poppins, Montserrat_Alternates, Orbitron } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/layout/navbar";
import { cn } from "@/lib/utils"; // Import cn utility

// Initialize fonts
const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800'], // Load desired weights
  variable: "--font-sans", // Use Poppins as the main sans font
});

const montserratAlternates = Montserrat_Alternates({
    subsets: ["latin"],
    weight: ['400', '700'], // Load necessary weights
    variable: "--font-heading-alt", // Define CSS variable for alternate heading font
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
          poppins.variable, // Apply Poppins variable
          montserratAlternates.variable, // Apply Montserrat Alternates variable
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

