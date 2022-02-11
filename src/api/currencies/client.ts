import { AxiosInstance } from 'axios';
import { Currency, CurrencyType } from './interfaces/currency.interface';

export class ToshlCurrencyClient {
  constructor(private readonly axios: AxiosInstance) {}

  list(opts: {
    currencies: string[];
    since: Date;
    types: CurrencyType;
  }): Promise<Currency> {
    return this.axios
      .get('/currencies', {
        params: {
          currencies: opts.currencies,
          since: opts.since.toISOString(),
          types: opts.types,
        },
      })
      .then((res) => res.data);
  }
}
