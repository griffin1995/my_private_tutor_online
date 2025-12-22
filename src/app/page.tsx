// TEMPORARY TEST PAGE - Root home page to verify routing works
// This will be replaced once TypeScript errors in (app)/page.tsx are fixed

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">
          🎉 Routing Fixed!
        </h1>
        <p className="text-xl mb-6">
          My Private Tutor Online - Website Successfully Running
        </p>
        <div className="space-y-2 text-sm opacity-90">
          <p>✅ Root layout.tsx working</p>
          <p>✅ App Router configured properly</p>
          <p>✅ No more 404 errors</p>
          <p>⚠️ TypeScript errors need fixing for full pages</p>
        </div>
      </div>
    </div>
  );
}