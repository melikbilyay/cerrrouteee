export default function PagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="grow">

      {children}

    </main>
  )
}
