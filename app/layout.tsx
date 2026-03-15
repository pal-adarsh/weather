
import '../lib/fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WeatherSphere | Real-time Weather Updates',
  description: 'Stay updated with the latest weather conditions worldwide!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}