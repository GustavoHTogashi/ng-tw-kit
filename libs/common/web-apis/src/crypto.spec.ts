/* eslint-disable @typescript-eslint/no-explicit-any */
import { NgtwCrypto, toData, NGTW_CRYPTO } from './crypto';
import { InjectionToken } from '@angular/core';
import { firstValueFrom, of } from 'rxjs';

const mockCrypto = {
  randomUUID: vi.fn(() => 'mock-uuid'),
  getRandomValues: vi.fn((arr: Uint8Array) => {
    arr.set([1, 2, 3, 4]);
    return arr;
  }),
  subtle: {
    digest: vi.fn((_alg: string, _data: ArrayBuffer) =>
      Promise.resolve(new Uint8Array([10, 20, 30, 40]).buffer),
    ),
  },
};

vi.mock('@angular/core', async () => {
  const actual = await vi.importActual<any>('@angular/core');
  return {
    ...actual,
    inject: (token: InjectionToken<any>) => {
      if (token === NGTW_CRYPTO) return mockCrypto;
      return undefined;
    },
  };
});

describe('NgtwCrypto', () => {
  let service: NgtwCrypto;

  beforeEach(() => {
    service = new NgtwCrypto();
    vi.clearAllMocks();
  });

  it('should generate a random UUID', () => {
    const uuid = service.randomUUID();
    expect(uuid).toBe('mock-uuid');
    expect(mockCrypto.randomUUID).toHaveBeenCalled();
  });

  it('should generate random values of given length', () => {
    const arr = service.randomValues(4);
    expect(arr).toEqual(new Uint8Array([1, 2, 3, 4]));
    expect(mockCrypto.getRandomValues).toHaveBeenCalledWith(
      expect.any(Uint8Array),
    );
  });

  it('should digest string data', async () => {
    const result$ = service.digest('sha-256', 'test');
    const result = await firstValueFrom(result$);
    expect(result).toBeInstanceOf(ArrayBuffer);
  });

  it('should digest object data', async () => {
    const obj = { foo: 'bar' };
    const result$ = service.digest('sha-256', obj);
    const result = await firstValueFrom(result$);
    expect(result).toBeInstanceOf(ArrayBuffer);
  });
});

describe('toData', () => {
  it('should convert ArrayBuffer to hex string if not JSON', () => {
    const arrBuf = new Uint8Array([1, 2, 3]).buffer;
    const sub = of(arrBuf)
      .pipe(toData())
      .subscribe((data) => {
        expect(data).toBe('010203');
        sub.unsubscribe();
      });
  });

  it('should return parsed JSON if possible', () => {
    // This is a bit artificial, but for coverage:
    const jsonStr = JSON.stringify({ foo: 'bar' });
    const hexStr = Array.from(new TextEncoder().encode(jsonStr))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    const arrBuf = new Uint8Array(
      hexStr.match(/.{1,2}/g)!.map((h) => parseInt(h, 16)),
    ).buffer;

    const sub = of(arrBuf)
      .pipe(toData<{ foo: string }>())
      .subscribe((data) => {
        expect(data).toEqual({ foo: 'bar' });
        sub.unsubscribe();
      });
  });
});
