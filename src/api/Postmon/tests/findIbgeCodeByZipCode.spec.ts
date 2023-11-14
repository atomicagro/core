import 'reflect-metadata';

import axios, { AxiosError, HttpStatusCode } from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { PostmonApi } from '@api/Postmon';

import RequestError from '@error/RequestError';

import { Factory } from '@utils/factory';

describe('PostmonApi', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('should call the Postmon Api and return the ibgeCode', async () => {
    const postmonApi = new PostmonApi();

    const zipCode = '38540-000';
    const ibgeCode = '4304606';

    const expectedData = Factory.makeCityInfo(ibgeCode);

    mockAxios.onGet(`/cep/${zipCode}`).reply(HttpStatusCode.Ok, expectedData);

    const result = await postmonApi.findIbgeCodeByZipCode(zipCode);

    expect(result).toMatchObject({ ibgeCode });
  });

  it('should throw an error if it not find ibgeCode to zip code', async () => {
    expect.assertions(3);

    const postmonApi = new PostmonApi();

    const zipCode = '38540-000';
    const error = new AxiosError();
    mockAxios.onGet(`/cep/${zipCode}`).reply(HttpStatusCode.NotFound, error);

    try {
      await postmonApi.findIbgeCodeByZipCode(zipCode);
    } catch (e) {
      expect(e).toBeInstanceOf(RequestError);
      expect((e as RequestError).message).toBe('REQUEST_ERROR');
      expect((e as RequestError).status).toBe(HttpStatusCode.NotFound);
    }
  });
});
