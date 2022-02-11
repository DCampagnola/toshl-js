export interface Currency {
  name: string;
  symbol: string;
  precision: number;
  modified: string;
  type: CurrencyType;
}

export enum CurrencyType {
  FIAT = 'fiat',
  COMMODITY = 'commodity',
  CRYPTO = 'crypto',
  DEPRECATED = 'deprecated',
}
