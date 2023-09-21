import { List } from '../domain/entities';
import BaseIntegration from './base.integration';

export default class TmdbIntegration extends BaseIntegration {
  constructor() {
    super('tmdb');
  }

  search(params: List) {
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_ACCES_TOKEN_AUTH}`,
      },
    };
    return this.request(params.path, {}, config, 'get');
  }
}
