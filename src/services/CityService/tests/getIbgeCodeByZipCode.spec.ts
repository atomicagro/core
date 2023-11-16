import 'reflect-metadata';

import { HttpStatusCode } from 'axios';

import { GoogleMaps } from '@api/GoogleMaps/interfaces/googleMaps';
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

    const spy = jest.fn().mockResolvedValue({ ibgeCode });

    container
      .bind<GoogleMaps>(TYPES.googleMaps)
      .toConstantValue({ findZipCodeByCoordinates: jest.fn(), setToken: jest.fn() });
    container.bind<Postmon>(TYPES.postmon).toConstantValue({ findIbgeCodeByZipCode: spy });

    const cityService = new CityService(
      container.get<GoogleMaps>(TYPES.googleMaps),
      container.get<Postmon>(TYPES.postmon),
    );

    const result = await cityService.getIbgeCodeByZipCode(zipCode);

    expect(result).toMatchObject({ ibgeCode });
    expect(spy).toHaveBeenCalledWith(zipCode);
  });

  it('should return throw erro of RequestError', async () => {
    expect.assertions(3);

    const zipCode = '92000-000';

    const spy = jest.fn().mockRejectedValue(new RequestError({ data: '', status: HttpStatusCode.ServiceUnavailable }));

    container
      .bind<GoogleMaps>(TYPES.googleMaps)
      .toConstantValue({ findZipCodeByCoordinates: jest.fn(), setToken: jest.fn() });
    container.bind<Postmon>(TYPES.postmon).toConstantValue({ findIbgeCodeByZipCode: spy });

    const cityService = new CityService(
      container.get<GoogleMaps>(TYPES.googleMaps),
      container.get<Postmon>(TYPES.postmon),
    );

    try {
      await cityService.getIbgeCodeByZipCode(zipCode);
    } catch (e) {
      expect(e).toBeInstanceOf(RequestError);
      expect((e as RequestError).message).toStrictEqual('REQUEST_ERROR');
      expect(spy).toHaveBeenCalledWith(zipCode);
    }
  });
});
