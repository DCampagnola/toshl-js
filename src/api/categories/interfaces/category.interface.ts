export interface CategoryInterface {
  id: string;

  name: string;

  /** @override */
  name_override: string;

  modified: string;

  type: CategoryType;

  deleted: boolean;

  counts: {
    entries: number;
    income_entries: number;
    expense_entries: number;
    tags_used_with_category: number;
    income_tags_used_with_category: number;
    expense_tags_used_with_category: number;
    tags: number;
    income_tags: number;
    expense_tags: number;
    budgets: number;
  };

  extra?: any;
}

export enum CategoryType {
  EXPENSE = 'expense',
  INCOME = 'income',
  SYSTEM = 'system',
}
