// app/layout.tsx
import { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Terminal Portfolio</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
