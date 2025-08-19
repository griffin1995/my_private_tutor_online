// CONTEXT7 SOURCE: /vercel/next.js - Layout inheritance from root dynamic configuration
// LAYOUT INHERITANCE: Official Next.js documentation states child layouts inherit parent dynamic config
// DYNAMIC CONFIG REMOVAL: Per CLAUDE.md documentation - avoid redundant page-level dynamic exports

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}