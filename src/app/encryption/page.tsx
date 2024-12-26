'use client'

import { useState } from 'react'
import { encrypt } from '@/lib/tea'
import { motion } from 'framer-motion'
import * as Switch from '@radix-ui/react-switch'
import * as Tooltip from '@radix-ui/react-tooltip'

export default function Encryption() {
  const [plaintext, setPlaintext] = useState<string>('')
  const [key, setKey] = useState<string>('')
  const [rounds, setRounds] = useState<number>(32)
  const [result, setResult] = useState<string>('')
  const [showHex, setShowHex] = useState<boolean>(false)

  const handleEncrypt = () => {
    try {
      const plaintextArray = plaintext.split(',').map(Number)
      const keyArray = key.split(',').map(Number)
      if (plaintextArray.length !== 2 || keyArray.length !== 4) {
        throw new Error('Invalid input format')
      }
      const encrypted = encrypt(plaintextArray, keyArray, rounds)
      setResult(showHex ? 
        `Encrypted: ${encrypted.map(n => '0x' + n.toString(16).padStart(8, '0')).join(', ')}` :
        `Encrypted: ${encrypted.join(', ')}`)
    } catch (error) {
      if (error instanceof Error) {
        setResult(`Error: ${error.message}`)
      } else {
        setResult('An unknown error occurred')
      }
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      <h1 className="text-4xl font-bold mb-8">TEA Encryption</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Plaintext (two comma-separated numbers)</label>
          <input
            type="text"
            value={plaintext}
            onChange={(e) => setPlaintext(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            placeholder="e.g., 1234567890,9876543210"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Key (four comma-separated numbers)</label>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="w-full p-2 bg-gray-800 rounded border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            placeholder="e.g., 1,2,3,4"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Rounds</label>
          <input
            type="number"
            value={rounds}
            onChange={(e) => setRounds(parseInt(e.target.value))}
            className="w-full p-2 bg-gray-800 rounded border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            min={1}
            max={64}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch.Root
            checked={showHex}
            onCheckedChange={setShowHex}
            className="w-11 h-6 bg-gray-600 rounded-full relative data-[state=checked]:bg-blue-500 outline-none cursor-default"
          >
            <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 transform translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
          </Switch.Root>
          <span className="text-sm">Show result in hexadecimal</span>
        </div>
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                onClick={handleEncrypt}
                className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition-colors duration-200"
              >
                Encrypt
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="bg-gray-800 text-white px-4 py-2 rounded shadow-lg"
                sideOffset={5}
              >
                Click to encrypt the plaintext
                <Tooltip.Arrow className="fill-gray-800" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
        <div>
          <h2 className="text-xl font-semibold mb-2">Result:</h2>
          <pre className="bg-gray-800 p-4 rounded border border-gray-700 overflow-x-auto">{result}</pre>
        </div>
      </div>
    </motion.div>
  )
}