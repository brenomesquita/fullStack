import { List } from '../entities';

export interface IListRepository {
  search: (params: List) => Promise<any>;
}
