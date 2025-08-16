import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'zkPromotionAgent - 基于zkTLS的去中心化广告平台',
  description: '基于 zkTLS 身份验证、AI 智能匹配、EIP-3009 即时结算的去中心化广告平台',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
