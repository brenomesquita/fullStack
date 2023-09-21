import axios from 'axios';

const EXTERNAL_SERVICES = {
  tmdb: process.env.TMDB_URL || '',
};

export default class BaseIntegration {
  private serviceName;
  private externalServices: { [key: string]: string };
  private httpClient: any;
  constructor(serviceName: string) {
    this.serviceName = serviceName;
    this.externalServices = EXTERNAL_SERVICES;
    this.httpClient = axios.create({
      baseURL: this.externalServices[this.serviceName],
    });
  }

  async request(
    path: string,
    params: any,
    config: any,
    method: string = 'post',
  ) {
    return await this.httpClient[method](path, config, params);
  }
}
