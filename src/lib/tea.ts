export function encrypt(v: number[], k: number[], rounds: number = 32): number[] {
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
  }
  
  export function decrypt(v: number[], k: number[], rounds: number = 32): number[] {
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
  }  