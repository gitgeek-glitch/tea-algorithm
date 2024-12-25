import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center">
      <h1 className="text-6xl font-bold mb-4">TEA</h1>
      <p className="text-xl mb-4">Tiny Encryption Algorithm</p>
      <p className="mb-8 max-w-2xl">
        A simple yet powerful block cipher that uses<br></br>simple operations for encryption and decryption.
      </p>
      <div className="flex space-x-4">
        <Link 
          href="/encryption" 
          className="bg-white text-[#1e2530] px-6 py-2 rounded hover:bg-gray-200"
        >
          Try Encryption
        </Link>
        <Link 
          href="/algorithm" 
          className="border border-white px-6 py-2 rounded hover:bg-gray-800"
        >
          Learn More
        </Link>
      </div>
    </div>
  )
}