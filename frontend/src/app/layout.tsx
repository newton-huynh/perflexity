import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Perplexity",
  description: "Your personalized AI fitness coach",
  icons: {
    icon: "/images/logobg.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased [--header-height:calc(theme(spacing.14))]`}
      >
        <SidebarProvider className="flex flex-col">
          <SiteHeader />
          <div className="flex flex-1">
            <AppSidebar />
            <SidebarInset>
              <Toaster />
              <div className="h-[calc(100svh-var(--header-height))] overflow-y-auto mt-(--header-height) flex flex-col justify-center items-center">
                {children}
              </div>
            </SidebarInset>
          </div>
      
        </SidebarProvider>
      </body>
    </html>
  );
}
