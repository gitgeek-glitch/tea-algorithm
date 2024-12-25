'use client'

import { useState } from 'react'
import { encrypt } from '@/lib/tea'

export default function Encryption() {
  const [plaintext, setPlaintext] = useState<string>('')
  const [key, setKey] = useState<string>('')
  const [rounds, setRounds] = useState<number>(32)
  const [result, setResult] = useState<string>('')

  const handleEncrypt = () => {
    try {
      const plaintextArray = plaintext.split(',').map(Number)
      const keyArray = key.split(',').map(Number)
      if (plaintextArray.length !== 2 || keyArray.length !== 4) {
        throw new Error('Invalid input format')
      }
      const encrypted = encrypt(plaintextArray, keyArray, rounds)
      setResult(`Encrypted: ${encrypted.join(',')}`)
    } catch (error) {
      if (error instanceof Error) {
        setResult(`Error: ${error.message}`)
      } else {
        setResult('An unknown error occurred')
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">TEA Encryption</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Plaintext (two comma-separated numbers)</label>
          <input
            type="text"
            value={plaintext}
            onChange={(e) => setPlaintext(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded"
            placeholder="e.g., 1234567890,9876543210"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Key (four comma-separated numbers)</label>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded"
            placeholder="e.g., 1,2,3,4"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Rounds</label>
          <input
            type="number"
            value={rounds}
            onChange={(e) => setRounds(parseInt(e.target.value))}
            className="w-full p-2 bg-gray-800 rounded"
            min={1}
            max={64}
          />
        </div>
        <button
          onClick={handleEncrypt}
          className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
        >
          Encrypt
        </button>
        <div>
          <h2 className="text-xl font-semibold mb-2">Result:</h2>
          <pre className="bg-gray-800 p-4 rounded">{result}</pre>
        </div>
      </div>
    </div>
  )
}