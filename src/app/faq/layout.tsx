// CONTEXT7 SOURCE: /vercel/next.js - Force dynamic rendering for FAQ route
// SSR COMPATIBILITY: Ensure FAQ route is never statically generated due to browser API dependencies

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}