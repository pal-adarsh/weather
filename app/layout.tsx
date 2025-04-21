
import '../lib/fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '../styles/globals.css'
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
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
</head>
      <body>
        {children}
      </body>
    </html>
  )
}