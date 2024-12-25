export default function Pseudocode() {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Pseudocode</h1>
        <div className="bg-gray-800 p-6 rounded-lg">
          <pre className="whitespace-pre-wrap font-mono text-sm">
  {`Encryption:
  Input: v0, v1 (64-bit plaintext block as two 32-bit integers)
         k[0], k[1], k[2], k[3] (128-bit key as four 32-bit integers)
         
  delta = 0x9E3779B9 (constant based on golden ratio)
  sum = 0
  
  for i = 1 to 32 do
      sum = sum + delta
      v0 = v0 + (((v1 << 4) + k[0]) ^ (v1 + sum) ^ ((v1 >> 5) + k[1]))
      v1 = v1 + (((v0 << 4) + k[2]) ^ (v0 + sum) ^ ((v0 >> 5) + k[3]))
  end for
  
  Output: v0, v1 (64-bit ciphertext block as two 32-bit integers)
  
  Decryption:
  Input: v0, v1 (64-bit ciphertext block as two 32-bit integers)
         k[0], k[1], k[2], k[3] (128-bit key as four 32-bit integers)
         
  delta = 0x9E3779B9
  sum = delta * 32
  
  for i = 1 to 32 do
      v1 = v1 - (((v0 << 4) + k[2]) ^ (v0 + sum) ^ ((v0 >> 5) + k[3]))
      v0 = v0 - (((v1 << 4) + k[0]) ^ (v1 + sum) ^ ((v1 >> 5) + k[1]))
      sum = sum - delta
  end for
  
  Output: v0, v1 (64-bit plaintext block as two 32-bit integers)`}
          </pre>
        </div>
      </div>
    )
  }  