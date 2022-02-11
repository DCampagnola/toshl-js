import { AxiosInstance } from 'axios';
import { Entry } from './interfaces/entry.interface';
import { EntryWrite } from './interfaces/entry-write.interface';

export class ToshlEntryClient {
  constructor(private readonly axios: AxiosInstance) {}

  list(
    opts: PaginationInterface & {
      since?: Date;
      from: Date;
      to: Date;
      type: 'expense' | 'income' | 'transaction';
      accounts?: string[];
      categories?: string[];
      tags?: string[];
      '!categories'?: string[];
      '!tags'?: string[];
      locations?: string[];
      '!locations'?: string[];
      repeat?: string;
      parent?: string;
      search?: string;
      include_deleted?: boolean;
      expand?: boolean;
    },
  ): Promise<Entry[]> {
    return this.axios
      .get('/entries', {
        params: {
          since: opts.since.toISOString(),
          from: opts.from.toDateString(),
          to: opts.to.toDateString(),
          type: opts.type,
          accounts: opts.accounts.join(','),
          categories: opts.categories.join(','),
          tags: opts.tags.join(','),
          '!categories': opts['!categories'].join(','),
          '!tags': opts['!tags'].join(','),
          locations: opts.locations.join(','),
          '!locations': opts['!locations'].join(','),
          repeat: opts.repeat,
          parent: opts.parent,
          search: opts.search,
          include_deleted: opts.include_deleted,
          expand: opts.expand,
        },
      })
      .then((res) => res.data);
  }

  get(id: string): Promise<Entry> {
    return this.axios.get(`/entries/${id}`).then((res) => res.data);
  }

  create(entry: EntryWrite): Promise<Entry> {
    return this.axios
      .post('/entries', ToshlEntryClient.fromEntryWrite(entry))
      .then((res) => res.data);
  }

  update(
    id: string,
    entry: EntryWrite,
    update: 'all' | 'one' | 'tail' = 'all',
  ): Promise<Entry> {
    return this.axios
      .put(
        `/entries/${id}`,
        {
          ...ToshlEntryClient.fromEntryWrite(entry),
          id,
        },
        {
          params: {
            update,
          },
        },
      )
      .then((res) => res.data);
  }

  private static fromEntryWrite(entry: EntryWrite) {
    return {
      amount: entry.amount,
      currency: entry.currency,
      date: entry.date.toISOString(),
      desc: entry.desc,
      account: entry.account,
      category: entry.category,
      tags: entry.tags,
      location: entry.location,
      repeat: entry.repeat
        ? {
            id: entry.repeat.id,
            start: entry.repeat.start.toISOString(),
            end: entry.repeat.end?.toISOString(),
            frequency: entry.repeat.frequency,
            interval: entry.repeat.interval,
            count: entry.repeat.count,
            byday: entry.repeat.byday,
            bymonthday: entry.repeat.bymonthday,
            bysetpos: entry.repeat.bysetpos,
            iteration: entry.repeat.iteration,
          }
        : undefined,
      transaction: entry.transaction,
      reminders: entry.reminders,
      split: entry.split,
      completed: entry.completed,
      extra: entry.extra,
    };
  }

  delete(id: string): Promise<void> {
    return this.axios.delete(`/entries/${id}`);
  }
}
