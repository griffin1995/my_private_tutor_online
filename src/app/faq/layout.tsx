// CONTEXT7 SOURCE: /vercel/next.js - Static rendering for FAQ layout build compatibility
// BUILD FIX REASON: Official Next.js documentation recommends force-static for layouts during static builds

export const dynamic = 'force-static'
export const revalidate = 300

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}