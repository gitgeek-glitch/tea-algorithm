'use client'

import { useState } from 'react'
import { encrypt } from '@/lib/tea'
import { motion } from 'framer-motion'
import * as Switch from '@radix-ui/react-switch'
import * as Tooltip from '@radix-ui/react-tooltip'
import { LockIcon } from 'lucide-react'

export default function Encryption() {
  const [plaintext, setPlaintext] = useState<string>('')
  const [key, setKey] = useState<string>('')
  const [rounds, setRounds] = useState<number>(32)
  const [result, setResult] = useState<string>('')
  const [showHex, setShowHex] = useState<boolean>(false)
  const [isHexInput, setIsHexInput] = useState<boolean>(false)

  const handleEncrypt = () => {
    try {
      const plaintextArray = isHexInput
        ? plaintext.split(',').map(n => parseInt(n.trim(), 16))
        : plaintext.split(',').map(Number)
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
      <h1 className="text-4xl font-bold mb-8 text-center">TEA Encryption</h1>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg space-y-6">
        <div>
          <label className="block text-sm mb-1">Plaintext (two comma-separated numbers)</label>
          <input
            type="text"
            value={plaintext}
            onChange={(e) => setPlaintext(e.target.value)}
            className="w-full p-3 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-white"
            placeholder={isHexInput ? "e.g., 0x12345678, 0x9abcdef0" : "e.g., 305419896, 2596069104"}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Key (four comma-separated numbers)</label>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="w-full p-3 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-white"
            placeholder="e.g., 1,2,3,4"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Rounds</label>
          <input
            type="number"
            value={rounds}
            onChange={(e) => setRounds(parseInt(e.target.value))}
            className="w-full p-3 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-white"
            min={1}
            max={64}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch.Root
              checked={isHexInput}
              onCheckedChange={setIsHexInput}
              className="w-11 h-6 bg-gray-600 rounded-full relative data-[state=checked]:bg-blue-500 outline-none cursor-default"
            >
              <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 transform translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
            </Switch.Root>
            <span className="text-sm">Hexadecimal input</span>
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
        </div>
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button
                onClick={handleEncrypt}
                className="w-full px-4 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <LockIcon size={20} />
                <span>Encrypt</span>
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
          <pre className="bg-gray-700 p-4 rounded border border-gray-600 overflow-x-auto text-blue-400">{result}</pre>
        </div>
      </div>
    </motion.div>
  )
}