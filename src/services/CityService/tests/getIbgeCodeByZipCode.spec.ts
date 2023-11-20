import 'reflect-metadata';

import { HttpStatusCode } from 'axios';

import { GoogleMapsApi } from '@api/GoogleMaps';
import { GoogleMaps } from '@api/GoogleMaps/interfaces/googleMaps';
import { PostmonApi } from '@api/Postmon';
import { Postmon } from '@api/Postmon/interfaces/postmon';

import { container } from '@configs/ioc';
import { TYPES } from '@configs/types';

import RequestError from '@error/RequestError';

import { CityService } from '@services/CityService';

describe('CityService - getIbgeCodeByZipCode', () => {
  beforeEach(() => container.snapshot());

  afterEach(() => container.restore());

  it('should return ibgeCode', async () => {
    const ibgeCode = '4304606';
    const zipCode = '92440-540';

    const googleMapsApi = new GoogleMapsApi();
    const postmonApi = new PostmonApi();

    const spy = jest.spyOn(postmonApi, 'findIbgeCodeByZipCode').mockResolvedValue({ ibgeCode });

    container.bind<GoogleMaps>(TYPES.googleMaps).toConstantValue(googleMapsApi);
    container.bind<Postmon>(TYPES.postmon).toConstantValue(postmonApi);
    container.bind<CityService>(TYPES.cityService).to(CityService);

    const cityService = container.get<CityService>(TYPES.cityService);

    const result = await cityService.getIbgeCodeByZipCode(zipCode);

    expect(result).toMatchObject({ ibgeCode });
    expect(spy).toHaveBeenCalledWith(zipCode);
  });

  it('should return throw erro of RequestError', async () => {
    expect.assertions(3);

    const zipCode = '92000-000';

    const googleMapsApi = new GoogleMapsApi();
    const postmonApi = new PostmonApi();

    const spy = jest
      .spyOn(postmonApi, 'findIbgeCodeByZipCode')
      .mockRejectedValue(new RequestError({ data: '', status: HttpStatusCode.ServiceUnavailable }));

    container.bind<GoogleMaps>(TYPES.googleMaps).toConstantValue(googleMapsApi);
    container.bind<Postmon>(TYPES.postmon).toConstantValue(postmonApi);
    container.bind<CityService>(TYPES.cityService).to(CityService);

    const cityService = container.get<CityService>(TYPES.cityService);

    try {
      await cityService.getIbgeCodeByZipCode(zipCode);
    } catch (e) {
      expect(e).toBeInstanceOf(RequestError);
      expect((e as RequestError).message).toStrictEqual('REQUEST_ERROR');
      expect(spy).toHaveBeenCalledWith(zipCode);
    }
  });
});
