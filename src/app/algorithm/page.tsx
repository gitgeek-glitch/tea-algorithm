export default function Algorithm() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Tiny Encryption Algorithm (TEA)</h1>
      <div className="space-y-4">
        <p>
          The Tiny Encryption Algorithm (TEA) is a block cipher notable for its simplicity of description and implementation, typically a few lines of code. It was designed by David Wheeler and Roger Needham of the Cambridge Computer Laboratory.
        </p>
        <h2 className="text-2xl font-semibold">Key Features:</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Block size: 64 bits (two 32-bit integers)</li>
          <li>Key size: 128 bits (four 32-bit integers)</li>
          <li>Number of rounds: 32 (recommended)</li>
          <li>Simple operations: uses only addition, XOR, and bit shifts</li>
          <li>No S-boxes or lookup tables required</li>
          <li>Fast implementation in software</li>
        </ul>
        <h2 className="text-2xl font-semibold">Algorithm Structure:</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Split the 64-bit block into two 32-bit integers (v0, v1)</li>
          <li>Use a 128-bit key split into four 32-bit integers (k[0] to k[3])</li>
          <li>Use a constant delta (derived from the golden ratio)</li>
          <li>Perform 32 rounds of mixing operations</li>
          <li>Each round:
            <ul className="list-disc pl-6 mt-2">
              <li>Updates v0 using v1, two key parts, and the sum</li>
              <li>Updates v1 using v0, two key parts, and the sum</li>
              <li>Uses a combination of addition, XOR, and shifts</li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  )
}