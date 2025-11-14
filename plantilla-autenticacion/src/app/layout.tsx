import type { Metadata } from 'next'
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper'
import './globals.css'

export const metadata: Metadata = {
  title: 'SaaS Factory',
  description: 'Tu aplicación SaaS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  )
}
