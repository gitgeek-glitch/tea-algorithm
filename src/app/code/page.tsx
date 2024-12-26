'use client'

import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import * as Tabs from '@radix-ui/react-tabs'

const encryptionCode = `function encrypt(v: number[], k: number[], rounds: number = 32): number[] {
  let v0 = v[0], v1 = v[1];
  const delta = 0x9E3779B9;
  let sum = 0;

  for (let i = 0; i < rounds; i++) {
    sum += delta;
    v0 += ((v1 << 4) + k[0]) ^ (v1 + sum) ^ ((v1 >>> 5) + k[1]);
    v0 >>>= 0;
    v1 += ((v0 << 4) + k[2]) ^ (v0 + sum) ^ ((v0 >>> 5) + k[3]);
    v1 >>>= 0;
  }

  return [v0, v1];
}`

const decryptionCode = `function decrypt(v: number[], k: number[], rounds: number = 32): number[] {
  let v0 = v[0], v1 = v[1];
  const delta = 0x9E3779B9;
  let sum = delta * rounds;

  for (let i = 0; i < rounds; i++) {
    v1 -= ((v0 << 4) + k[2]) ^ (v0 + sum) ^ ((v0 >>> 5) + k[3]);
    v1 >>>= 0;
    v0 -= ((v1 << 4) + k[0]) ^ (v1 + sum) ^ ((v1 >>> 5) + k[1]);
    v0 >>>= 0;
    sum -= delta;
  }

  return [v0, v1];
}`

export default function Code() {
  const [activeTab, setActiveTab] = useState('encrypt')

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-8">TEA Implementation</h1>
      <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
        <Tabs.List className="flex space-x-4 mb-4">
          <Tabs.Trigger
            value="encrypt"
            className={`px-4 py-2 rounded ${
              activeTab === 'encrypt' ? 'bg-blue-500' : 'bg-gray-700'
            }`}
          >
            Encryption
          </Tabs.Trigger>
          <Tabs.Trigger
            value="decrypt"
            className={`px-4 py-2 rounded ${
              activeTab === 'decrypt' ? 'bg-green-500' : 'bg-gray-700'
            }`}
          >
            Decryption
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="encrypt">
          <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
            {encryptionCode}
          </SyntaxHighlighter>
        </Tabs.Content>
        <Tabs.Content value="decrypt">
          <SyntaxHighlighter language="typescript" style={vscDarkPlus}>
            {decryptionCode}
          </SyntaxHighlighter>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
}