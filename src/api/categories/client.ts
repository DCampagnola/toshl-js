import { AxiosInstance } from 'axios';
import {
  CategoryInterface,
  CategoryType,
} from './interfaces/category.interface';

export class ToshlCategoriesClient {
  constructor(private readonly axios: AxiosInstance) {}

  list(
    opts: PaginationInterface & {
      since?: Date;
      type?: 'expense' | 'income';
      search?: string;
      includeDeleted?: boolean;
      ids?: string[];
    },
  ): Promise<CategoryInterface[]> {
    return this.axios
      .get('/categories', {
        params: {
          page: opts.page,
          per_page: opts.perPage,
          since: opts.since ? opts.since.toISOString() : undefined,
          type: opts.type,
          search: opts.search,
          include_deleted: opts.includeDeleted,
          ids: opts.ids,
        },
      })
      .then((res) => res.data);
  }

  get(id: string): Promise<CategoryInterface> {
    return this.axios.get(`/categories/${id}`).then((res) => res.data);
  }

  create(opts: {
    name: string;
    type: 'expense' | 'income';
    extra?: any;
  }): Promise<CategoryInterface> {
    return this.axios
      .post('/categories', {
        name: opts.name,
        type: opts.type,
        extra: opts.extra,
      })
      .then((res) => res.data);
  }

  update(
    id: string,
    opts: {
      name: string;
      nameOverride?: string;
      modified: Date;
      type: 'expense' | 'income';
      extra?: any;
    },
  ): Promise<CategoryInterface> {
    return this.axios
      .put(`/categories/${id}`, {
        id,
        name_override: opts.nameOverride,
        name: opts.name,
        modified: opts.modified?.toISOString(),
        type: opts.type,
        extra: opts.extra,
      })
      .then((res) => res.data);
  }

  delete(id: string): Promise<void> {
    return this.axios.delete(`/categories/${id}`).then((res) => res.data);
  }
}
