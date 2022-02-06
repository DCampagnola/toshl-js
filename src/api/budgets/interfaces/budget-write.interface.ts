import { BudgetFrequencyEnum, BudgetTypeEnum } from './budget.interface';

export interface BudgetWriteInterface {
  name: string;
  limit: number;
  currency: {
    code: string;
    rate: number;
    mainRate: number;
    fixed: boolean;
  };
  rollover?: boolean;
  rolloverOverride?: boolean;
  rolloverAmount?: number;
  recurrence?: {
    frequency?: BudgetFrequencyEnum;
    interval?: number;
    start?: Date;
    end?: Date;
    byday?: string;
    bymonthday?: string;
    bysetpos?: string;
  };
  type: BudgetTypeEnum;
  percent: number;
  delta: number;
  tags?: string[];
  '!tags'?: string[];
  categories?: string[];
  '!categories'?: string[];
  accounts?: string[];
  '!accounts'?: string[];
  extra?: any;
}
