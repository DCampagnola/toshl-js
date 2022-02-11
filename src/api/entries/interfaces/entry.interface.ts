export interface Entry {
  id: string;
  amount: number;
  currency: {
    code: string;
    rate: number;
    main_rate: string;
    fixed: boolean;
  };
  date: string;
  desc: string;
  account: string;
  category: string;
  tags: string[];
  location: {
    id: string;
    venue_id: string;
    latitude: number;
    longitude: number;
  };
  created: string;
  modified: string;
  repeat: {
    id: string;
    start: string;
    end: string;
    template_start: string;
    template_end: string;
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
    count: number;
    byday: string;
    bymonthday: string;
    bysetpos: string;
    iteration: number;
    template: boolean;
    entries: string[];
    type: 'automatic' | 'confirm' | 'confirmed';
  };
  transaction: {
    id: string;
    amount: number;
    currency: {
      code: string;
      rate: number;
      main_rate: string;
      fixed: boolean;
    };
  };
  images: {
    id: string;
    path: string;
    filename: string;
    type: 'image' | 'pdf';
    status: 'new' | 'uploaded' | 'error' | 'deleting';
  }[];
  reminders: {
    period: 'day' | 'week' | 'month' | 'year';
    number: number;
    at: string;
  }[];
  import?: {
    id: string;
    connection: string;
    memo: string;
    payee: string;
    pending: boolean;
  };
  review?: {
    id: string;
    type: 'expense' | 'income' | 'transfer' | 'repeat';
    completed: boolean;
  };
  settle?: {
    id: string;
  };
  split?: {
    parent: string;
    children: string[];
  };
  readonly: string[];
  completed: boolean;
  deleted: boolean;
  extra?: any;
}
