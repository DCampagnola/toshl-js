import { ToshlAccountsClient } from '../api/accounts/client';
import axios, { AxiosInstance } from 'axios';
import { ToshlBudgetsClient } from '../api/budgets/client';
import { ToshlCategoriesClient } from '../api/categories/client';
import { ToshlCurrencyClient } from '../api/currencies/client';
import { ToshlEntryClient } from '../api/entries/client';

export interface ToshlClientConfig {
  apiKey: string;
}

export class ToshlClient {
  private axiosInstance: AxiosInstance;
  constructor(public config: ToshlClientConfig) {
    if (!config.apiKey) {
      throw new Error('apiKey is required');
    }
    this.axiosInstance = axios.create({
      baseURL: 'https://api.toshl.com/',
      auth: {
        username: config.apiKey,
        password: '',
      },
    });
    this.accounts = new ToshlAccountsClient(this.axiosInstance);
    this.budgets = new ToshlBudgetsClient(this.axiosInstance);
    this.categories = new ToshlCategoriesClient(this.axiosInstance);
    this.currencies = new ToshlCurrencyClient(this.axiosInstance);
    this.entries = new ToshlEntryClient(this.axiosInstance);
  }

  accounts: ToshlAccountsClient;

  budgets: ToshlBudgetsClient;

  categories: ToshlCategoriesClient;

  currencies: ToshlCurrencyClient;

  entries: ToshlEntryClient;
}
