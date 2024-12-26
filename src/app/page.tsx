import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-6xl font-bold mb-4">TEA Algorithm</h1>
      <p className="text-xl mb-8 max-w-2xl">
        Explore the Tiny Encryption Algorithm: A simple yet powerful block cipher.
      </p>
      <Link href="/encryption" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Try Encryption
      </Link>
    </div>
  )
}