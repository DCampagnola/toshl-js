export interface EntryWrite {
  amount: number;
  currency: {
    code: string;
    rate?: number;
    main_rate?: number;
    fixed?: boolean;
  };
  date: Date;
  desc?: string;
  account: string;
  category: string;
  tags?: string[];
  location?: {
    id?: string;
    venue_id?: string;
    latitude?: number;
    longitude?: number;
  };
  repeat?: {
    id?: string;
    start: Date;
    end?: Date;
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
    count?: number;
    byday?: string;
    bymonthday?: string;
    bysetpos?: string;
    iteration?: number;
  };
  transaction?: {
    id: string;
    account: string;
    currency: {
      code: string;
      rate?: number;
      main_rate?: number;
      fixed?: boolean;
    };
  };
  images?: {
    id?: string;
  }[];
  reminders?: {
    period?: 'day' | 'week' | 'month' | 'year';
    number?: number;
    at?: string;
  };
  split?: {
    parent: string;
  };
  completed?: boolean;
  extra?: any;
}
