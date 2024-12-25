'use client'

import * as Tabs from '@radix-ui/react-tabs'

const encryptionCode = `function teaEncrypt(plaintext, key, rounds = 32) {
    const DELTA = 0x9E3779B9;
    let [v0, v1] = plaintext;
    let [k0, k1, k2, k3] = key;
    let sum = 0;
    
    for (let i = 0; i < rounds; i++) {
        sum += DELTA;
        v0 += ((v1 << 4) + k0) ^ (v1 + sum) ^ ((v1 >>> 5) + k1);
        v0 >>>= 0;
        v1 += ((v0 << 4) + k2) ^ (v0 + sum) ^ ((v0 >>> 5) + k3);
        v1 >>>= 0;
    }
    
    return [v0, v1];
}`

const decryptionCode = `function teaDecrypt(ciphertext, key, rounds = 32) {
    const DELTA = 0x9E3779B9;
    let [v0, v1] = ciphertext;
    let [k0, k1, k2, k3] = key;
    let sum = DELTA * rounds;
    
    for (let i = 0; i < rounds; i++) {
        v1 -= ((v0 << 4) + k2) ^ (v0 + sum) ^ ((v0 >>> 5) + k3);
        v1 >>>= 0;
        v0 -= ((v1 << 4) + k0) ^ (v1 + sum) ^ ((v1 >>> 5) + k1);
        v0 >>>= 0;
        sum -= DELTA;
    }
    
    return [v0, v1];
}`

export default function CodeTabs() {
  return (
    <Tabs.Root defaultValue="encrypt" className="flex flex-col w-full">
      <Tabs.List className="flex border-b border-gray-700 mb-4">
        <Tabs.Trigger 
          value="encrypt"
          className="px-6 py-2 text-gray-400 hover:text-white data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-white"
        >
          Encrypt
        </Tabs.Trigger>
        <Tabs.Trigger 
          value="decrypt"
          className="px-6 py-2 text-gray-400 hover:text-white data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-white"
        >
          Decrypt
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="encrypt">
        <pre className="bg-[#1e2530] p-6 rounded-lg overflow-x-auto">
          <code className="text-white">{encryptionCode}</code>
        </pre>
      </Tabs.Content>
      <Tabs.Content value="decrypt">
        <pre className="bg-[#1e2530] p-6 rounded-lg overflow-x-auto">
          <code className="text-white">{decryptionCode}</code>
        </pre>
      </Tabs.Content>
    </Tabs.Root>
  )
}