export const metadata = {
  title: 'Doylestown Auto Content Engine',
  description: 'AI-Powered Content for Audi & Porsche Owners',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
