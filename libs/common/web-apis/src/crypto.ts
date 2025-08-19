import { inject, Injectable, InjectionToken } from '@angular/core';
import { from, map } from 'rxjs';
import { NGTW_WINDOW } from './window';

export const NGTW_CRYPTO = new InjectionToken<Crypto>('[NGTW_CRYPTO]', {
  providedIn: 'root',
  factory: () => {
    const { crypto } = inject(NGTW_WINDOW);

    if (!crypto) {
      throw new Error('Crypto API is not supported in this environment.');
    }

    return crypto;
  },
});

type NgtwAlgorithm = 'sha-1' | 'sha-256' | 'sha-384' | 'sha-512';

@Injectable({
  providedIn: 'root',
})
export class NgtwCrypto {
  private _crypto = inject(NGTW_CRYPTO);

  randomUUID() {
    return this._crypto.randomUUID();
  }

  randomValues(length: number) {
    return this._crypto.getRandomValues(new Uint8Array(length));
  }

  digest<T>(algorithm: NgtwAlgorithm, data: T) {
    const stringifiedData =
      typeof data === 'string' ? data : JSON.stringify(data);

    const encoder = new TextEncoder();
    const arrayBuffer = encoder.encode(stringifiedData).buffer;
    return from(this._crypto.subtle.digest(algorithm, arrayBuffer));
  }
}

export function toData<T>() {
  return map((arrayBuffer: ArrayBuffer) => {
    const byteArray = new Uint8Array(arrayBuffer);
    const stringifiedData = Array.from(byteArray)
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
    try {
      return JSON.parse(stringifiedData) as T;
    } catch (_) {
      return stringifiedData; // If parsing fails, return the hex string
    }
  });
}
