export interface BudgetInterface {
  id: string;
  parent: string;
  name: string;
  limit: number;
  limit_planned: number;
  amount: number;
  planned: number;
  history_amount_median: number;
  currency: {
    code: string;
    rate: number;
    main_rate: number;
    fixed: boolean;
  };
  from: string;
  to: string;
  rollover: boolean;
  rollover_override: boolean;
  rollover_amount: number;
  rollover_amount_planned: number;
  modified: string;
  recurrence: {
    frequency: BudgetFrequencyEnum;
    interval: number;
    start: string;
    end: string;
    byday: string;
    bymonthday: string;
    bysetpos: string;
    iteration: number;
  };
  status: BudgetStatusEnum;
  type: BudgetTypeEnum;
  percent: number;
  delta: number;
  order: number;
  tags: string[];
  '!tags': string[];
  categories: string[];
  '!categories': string[];
  accounts: string[];
  '!accounts': string[];
  deleted: boolean;
  recalculated: boolean;
  extra?: any;
  problem?: {
    id: string;
    description: string;
    deleted_accounts: string[];
    deleted_tags: string[];
    deleted_categories: string[];
  };
}

export enum BudgetFrequencyEnum {
  ONE_TIME = 'one-time',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

export enum BudgetStatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ARCHIVED = 'archived',
}

export enum BudgetTypeEnum {
  REGULAR = 'regular',
  DELTA = 'delta',
  PERCENT = 'percent',
}
