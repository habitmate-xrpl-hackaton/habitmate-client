import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { XRPLProvider } from "@/xrpl-react-integration";
import BufferProvider from "@/components/BufferProvider";
import { AppProvider } from "@/lib/context/AppContext";
import GlobalBottomNavigationWrapper from "@/components/GlobalBottomNavigationWrapper";
import ClientSWRConfig from "@/lib/swr/ClientSWRConfig";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HabitMate",
  description: "Build better habits with accountability and community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#f6f9ff] font-['Pretendard']`}
      >
        <Providers>
          <ClientSWRConfig>
            <BufferProvider>
              <XRPLProvider>
                <AppProvider>
                  <div className="w-full max-w-md mx-auto min-h-screen relative">
                    {children}
                    <GlobalBottomNavigationWrapper />
                  </div>
                </AppProvider>
              </XRPLProvider>
            </BufferProvider>
          </ClientSWRConfig>
        </Providers>
      </body>
    </html>
  );
}
