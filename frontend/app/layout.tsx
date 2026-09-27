import type { Metadata, Viewport } from "next";
import { QueryProvider } from "@/providers/QueryProvider";
import { TooltipProvider } from "@/providers/TooltipProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClaimShield AI — Investigation & Evidence Platform",
  description:
    "AI-assisted multimodal insurance claim forensic investigation and evidence analysis platform supporting human investigators.",
};

export const viewport: Viewport = {
  themeColor: "#FAFBFD",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <QueryProvider>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
