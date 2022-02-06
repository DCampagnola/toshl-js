import { ToshlAccountsClient } from '../api/accounts/client';
import axios, { AxiosInstance } from 'axios';

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
  }

  accounts: ToshlAccountsClient;
}
