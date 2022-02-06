import { Account, AccountStatusEnum } from './interfaces/account.interface';
import { AxiosInstance } from 'axios';
import { AccountWriteInterface } from './interfaces/account-write.interface';

export class ToshlAccountsClient {
  constructor(private readonly axios: AxiosInstance) {}

  get(accountId: string): Promise<Account> {
    if (!accountId) {
      throw new Error('Account ID is required');
    }
    return this.axios.get(`/accounts/${accountId}`);
  }

  list(
    opts: PaginationInterface & {
      since?: Date;
      status?: AccountStatusEnum;
      includeDeleted?: boolean;
      ids?: string[];
    },
  ): Promise<Account[]> {
    return this.axios.get('/accounts', {
      params: {
        page: opts.page,
        per_page: opts.perPage,
        since: opts.since?.toISOString(),
        include_deleted: opts.includeDeleted,
        ids: opts.ids?.join(','),
      },
    });
  }

  create(account: AccountWriteInterface): Promise<Account> {
    return this.axios.post(
      '/accounts',
      ToshlAccountsClient.getWriteBody(account),
    );
  }

  private static getWriteBody(account: AccountWriteInterface) {
    return {
      parent: account.parent,
      name: account.name,
      type: account.type,
      initial_balance: account.initialBalance,
      currency: account.currency
        ? {
            code: account.currency.code,
            rate: account.currency.rate,
            main_rate: account.currency.mainRate,
            fixed: account.currency.fixed,
          }
        : undefined,
      goal: account.goal
        ? {
            amount: account.goal.amount,
            start: account.goal.start?.toISOString(),
            end: account.goal.end?.toISOString(),
          }
        : undefined,
      extra: account.extra,
    };
  }

  update(account: AccountWriteInterface & { id: number }): Promise<Account> {
    if (!account.id) {
      throw new Error('Account must have an id');
    }
    return this.axios.put(`/accounts/${account.id}`, {
      ...ToshlAccountsClient.getWriteBody(account),
      id: account.id,
    });
  }

  delete(accountId: string): Promise<void> {
    return this.axios.delete(`/accounts/${accountId}`);
  }
}
