export interface Account {
  id: string;
  parent?: string;
  name: string;
  /** @deprecated */
  name_override?: boolean;
  type: AccountTypeEnum;
  balance: number;
  initial_balance: number;
  limit: number;
  currency: {
    code: string;
    rate: number;
    main_rate: number;
    fixed: boolean;
  };
  daily_sum_median: {
    expenses: number;
    incomes: number;
  };
  avg: {
    expenses: number;
    incomes: number;
  };
  status: AccountStatusEnum;
  order: number;
  modified: string;
  goal?: {
    amount: number;
    start: string;
    end: string;
  };
  connection?: {
    id: string;
    name: string;
    status: ConnectionStatusEnum;
    logo?: string;
  };
  settle?: {
    byday: string;
    bymonthday: string;
    bysetpos: string;
  };
  billing?: {
    byday: string;
    bymonthday: string;
    bysetpos: string;
  };
  count: number;
  review: number;
  deleted: boolean;
  recalculated: boolean;
  extra?: any;
}

export enum ConnectionStatusEnum {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  INACTIVE = 'inactive',
  ERROR = 'error',
}

export enum AccountStatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ARCHIVED = 'archived',
}

export enum AccountTypeEnum {
  CUSTOM = 'custom',
  DEPOSITORY = 'depository',
  CREDIT_CARD = 'credit_card',
  LOAN = 'loan',
  MORTGAGE = 'mortgage',
  BROKERAGE = 'brokerage',
  INVESTMENT = 'investment',
  SAVINGS = 'savings',
  OTHER = 'other',
}
