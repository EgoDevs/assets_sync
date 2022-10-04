import curve from 'starkbank-ecdsa';
import fs from 'fs';
import path from 'path';
import { Secp256k1KeyIdentity } from '@dfinity/identity';

export function fromHexString(hexString: string): ArrayBuffer {
  return new Uint8Array(
    (hexString.match(/.{1,2}/g) ?? []).map(byte => parseInt(byte, 16)),
  ).buffer;
}

export const toHexString = (bytes: Uint8Array) =>
  bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
const PrivateKey = curve.PrivateKey;
const secretKey = PrivateKey.fromPem(
  fs
    .readFileSync(path.join(process.cwd(), '/credentials', '/whitelist.pem'), {
      encoding: 'utf-8',
    })
    .toString(),
);
const identity = Secp256k1KeyIdentity.fromSecretKey(
  fromHexString(BigInt(secretKey.secret.toString()).toString(16)),
);

export { identity };
