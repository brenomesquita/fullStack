import { IListRepository } from '../../../../domain/repositories/list.repository.interface';
import { UnprocessableContentException } from '../../../../exceptions';
import { ListDto } from './list-user.dto';
import NodeCache from 'node-cache';

export class ListUseCase {
  private integration!: IListRepository;
  private cache!: NodeCache;
  constructor(integration: IListRepository) {
    this.integration = integration;
    this.cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });
  }

  async handle(value: ListDto): Promise<any> {
    try {
      const cache = this.cache.get(value.query);
      if (cache)
        return {
          result: cache,
        };
      const { data } = await this.integration.search({
        path: value.path,
        query: value.query,
      });
      this.cache.set(value.query, data);

      return {
        result: data,
      };
    } catch (error: any) {
      throw new UnprocessableContentException(
        error.message || 'Unprocessable Entity',
      );
    }
  }
}
