import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sacred Structures",
  description: "Explore the beauty and history of Sacred Structures around the world",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Next.js</title>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
       
        </ThemeProvider>
        
      </body>
    </html>
  )
}



import './globals.css'
