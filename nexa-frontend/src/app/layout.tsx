// src/app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/react"
import { Suspense } from "react"
import "./globals.css"
import { AppProviders } from "@/components/providers/AppProviders"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "next-themes" // <-- 1. Re-add this import

export const metadata: Metadata = {
  title: "Nexa - Smart Crypto Yield Aggregator",
  description: "Maximize your DeFi yields with multi-chain strategies powered by NEAR Intents",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          {/* 2. Nest the providers. ThemeProvider now wraps our AppProviders. */}
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <AppProviders>
              {children}
            </AppProviders>
          </ThemeProvider>
        </Suspense>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}