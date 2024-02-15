export const metadata = {
  title: 'Signup',
  description: 'Devcamp Signup',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <div className="w-[375px] mx-auto">
        {children}
      </div>
    </html>
  )
}
