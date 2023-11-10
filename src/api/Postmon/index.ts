import axios, { AxiosError, AxiosInstance } from 'axios';
import { injectable } from 'inversify';

import { PostmonDto } from '@api/Postmon/dtos/PostmonDTO';
import { InfoCity } from '@api/Postmon/interfaces/infoCity';
import { Postmon } from '@api/Postmon/interfaces/postmon';

import { parseError } from '@error/parseError';
import RequestError from '@error/RequestError';

@injectable()
export class PostmonApi implements Postmon {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({ baseURL: 'https://api.postmon.com.br/v1' });
  }

  async findIbgeCodeByZipCode(zipCode: string) {
    try {
      const { data } = await this.axios.get<InfoCity>(`/cep/${zipCode}`);

      return PostmonDto.build(data);
    } catch (e) {
      if ((e as AxiosError).response) throw new RequestError(parseError(e));
      throw e;
    }
  }
}
