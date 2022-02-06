import { AxiosInstance } from 'axios';
import { BudgetInterface } from './interfaces/budget.interface';
import { BudgetWriteInterface } from './interfaces/budget-write.interface';

export class ToshlBudgetsClient {
  constructor(private readonly axios: AxiosInstance) {}

  list(
    opts: PaginationInterface & {
      since?: Date;
      from: Date;
      to: Date;
      tags?: string[];
      categories?: string[];
      accounts?: string[];
      search?: string;
      includeDeleted?: boolean;
      expand?: boolean;
      hasProblem?: boolean;
      oneIterationOnly?: boolean;
      parent: string;
    },
  ): Promise<BudgetInterface[]> {
    return this.axios.get('/budgets', {
      params: {
        page: opts.page,
        per_page: opts.perPage,
        since: opts.since?.toISOString(),
        from: opts.from.toISOString(),
        to: opts.to.toISOString(),
        tags: opts.tags?.join(','),
        categories: opts.categories?.join(','),
        accounts: opts.accounts?.join(','),
        search: opts.search,
        include_deleted: opts.includeDeleted,
        expand: opts.expand,
        has_problem: opts.hasProblem,
        one_iteration_only: opts.oneIterationOnly,
        parent: opts.parent,
      },
    });
  }

  get(id: string): Promise<BudgetInterface> {
    return this.axios.get(`/budgets/${id}`);
  }

  create(budget: BudgetWriteInterface): Promise<BudgetInterface> {
    return this.axios.post('/budgets', this.getWriteBody(budget));
  }

  private getWriteBody(budget: BudgetWriteInterface) {
    return {
      name: budget.name,
      limit: budget.limit,
      currency: {
        code: budget.currency.code,
        rate: budget.currency.rate,
        main_rate: budget.currency.mainRate,
        fixed: budget.currency.fixed,
      },
      rollover: budget.rollover,
      rollover_override: budget.rolloverOverride,
      rollover_amount: budget.rolloverAmount,
      recurrence: budget.recurrence
        ? {
            frequency: budget.recurrence.frequency,
            interval: budget.recurrence.interval,
            start: budget.recurrence.start?.toISOString(),
            end: budget.recurrence.end?.toISOString(),
            byday: budget.recurrence.byday,
            bymonthday: budget.recurrence.bymonthday,
            bysetpos: budget.recurrence.bysetpos,
          }
        : null,
      type: budget.type,
      percent: budget.percent,
      delta: budget.delta,
      tags: budget.tags,
      '!tags': budget['!tags'],
      categories: budget.categories,
      '!categories': budget['!categories'],
      accounts: budget.accounts,
      '!accounts': budget['!accounts'],
      extra: budget.extra,
    };
  }

  update(
    budget: BudgetWriteInterface & { id: string },
    effect: 'all' | 'one' | 'tail',
  ): Promise<BudgetInterface> {
    return this.axios.put(
      `/budgets/${budget.id}`,
      {
        ...this.getWriteBody(budget),
        id: budget.id,
      },
      {
        params: {
          effect,
        },
      },
    );
  }

  delete(id: string): Promise<void> {
    return this.axios.delete(`/budgets/${id}`);
  }
}
