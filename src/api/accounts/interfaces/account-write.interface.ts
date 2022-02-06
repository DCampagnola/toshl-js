import { AccountTypeEnum } from './account.interface';

export interface AccountWriteInterface {
  parent?: string;
  name: string;
  type?: AccountTypeEnum;
  initialBalance?: number;
  currency?: {
    code: string;
    rate?: number;
    mainRate?: number;
    fixed?: boolean;
  };
  goal?: {
    amount?: number;
    start?: Date;
    end?: Date;
  };
  extra?: any;
}
