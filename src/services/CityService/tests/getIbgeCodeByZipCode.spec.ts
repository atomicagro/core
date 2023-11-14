import 'reflect-metadata';

import { HttpStatusCode } from 'axios';
import { Container } from 'inversify';

import { GoogleMaps } from '@api/GoogleMaps/interfaces/googleMaps';
import { Postmon } from '@api/Postmon/interfaces/postmon';

import { TYPES } from '@configs/types';

import RequestError from '@error/RequestError';

import { CityService } from '@services/CityService';

describe('CityService - getIbgeCodeByZipCode', () => {
  it('should return ibgeCode', async () => {
    const ibgeCode = '4304606';
    const zipCode = '92440-540';

    const spy = jest.fn().mockResolvedValue({ ibgeCode });

    const container = new Container();
    container.bind<GoogleMaps>(TYPES.googleMaps).toConstantValue({ findZipCodeByCoordinates: jest.fn() });
    container.bind<Postmon>(TYPES.postmon).toConstantValue({ findIbgeCodeByZipCode: spy });

    const cityService = new CityService(
      container.get<GoogleMaps>(TYPES.googleMaps),
      container.get<Postmon>(TYPES.postmon),
    );

    const result = await cityService.getIbgeCodeByZipCode(zipCode);

    expect(result).toMatchObject({ ibgeCode });
    expect(spy).toHaveBeenCalledWith(zipCode);
  });

  it('should return throw erro of IbgeCodeNotFoundError', async () => {
    expect.assertions(3);

    const zipCode = '92000-000';

    const spy = jest.fn().mockRejectedValue(new RequestError({ data: '', status: HttpStatusCode.ServiceUnavailable }));

    const container = new Container();
    container.bind<GoogleMaps>(TYPES.googleMaps).toConstantValue({ findZipCodeByCoordinates: jest.fn() });
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
