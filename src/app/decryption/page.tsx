'use client'

import { useState } from 'react'
import { decrypt } from '@/lib/tea'

export default function Decryption() {
  const [ciphertext, setCiphertext] = useState<string>('')
  const [key, setKey] = useState<string>('')
  const [rounds, setRounds] = useState<number>(32)
  const [result, setResult] = useState<string>('')

  const handleDecrypt = () => {
    try {
      const ciphertextArray = ciphertext.split(',').map(Number)
      const keyArray = key.split(',').map(Number)
      if (ciphertextArray.length !== 2 || keyArray.length !== 4) {
        throw new Error('Invalid input format')
      }
      const decrypted = decrypt(ciphertextArray, keyArray, rounds)
      setResult(`Decrypted: ${decrypted.join(',')}`)
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
      <h1 className="text-3xl font-bold">TEA Decryption</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Ciphertext (two comma-separated numbers)</label>
          <input
            type="text"
            value={ciphertext}
            onChange={(e) => setCiphertext(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded"
            placeholder="e.g., 3040586899,1938459495"
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
          onClick={handleDecrypt}
          className="px-4 py-2 bg-green-500 rounded hover:bg-green-600"
        >
          Decrypt
        </button>
        <div>
          <h2 className="text-xl font-semibold mb-2">Result:</h2>
          <pre className="bg-gray-800 p-4 rounded">{result}</pre>
        </div>
      </div>
    </div>
  )
}