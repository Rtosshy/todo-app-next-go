import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-12">Welcome to Todo App</h1>
        <Link
          href="/auth?tab=signup"
          className="inline-block px-8 py-2 text-2xl bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
        >
          Get Started
        </Link>
      </div>
    </div>
  )
}
