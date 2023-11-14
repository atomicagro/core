import 'reflect-metadata';

import { HttpStatusCode } from 'axios';
import { Container } from 'inversify';

import { GoogleMaps } from '@api/GoogleMaps/interfaces/googleMaps';
import { Postmon } from '@api/Postmon/interfaces/postmon';

import { TYPES } from '@configs/types';

import RequestError from '@error/RequestError';

import { CityService } from '@services/CityService';

describe('CityService - getZipCodeByCoordinates', () => {
  it('should return zipcode', async () => {
    const coordinates = { lat: '123', long: '456' };
    const token = 'TOKEN';
    const zipCode = '92440-540';

    const spy = jest.fn().mockResolvedValue({ zipCode });

    const container = new Container();
    container.bind<GoogleMaps>(TYPES.googleMaps).toConstantValue({ findZipCodeByCoordinates: spy });
    container.bind<Postmon>(TYPES.postmon).toConstantValue({ findIbgeCodeByZipCode: jest.fn() });

    const cityService = new CityService(
      container.get<GoogleMaps>(TYPES.googleMaps),
      container.get<Postmon>(TYPES.postmon),
    );

    const result = await cityService.getZipCodeByCoordinates(coordinates, token);

    expect(result).toMatchObject({ zipCode });
    expect(spy).toHaveBeenCalledWith(coordinates, token);
  });

  it('should return throw erro invalid token', async () => {
    expect.assertions(5);

    const coordinates = { lat: '123', long: '456' };
    const token = 'TOKEN';

    const spy = jest
      .fn()
      .mockRejectedValue(new RequestError({ data: 'Invalid token', status: HttpStatusCode.Unauthorized }));

    const container = new Container();
    container.bind<GoogleMaps>(TYPES.googleMaps).toConstantValue({ findZipCodeByCoordinates: spy });
    container.bind<Postmon>(TYPES.postmon).toConstantValue({ findIbgeCodeByZipCode: jest.fn() });

    const cityService = new CityService(
      container.get<GoogleMaps>(TYPES.googleMaps),
      container.get<Postmon>(TYPES.postmon),
    );

    try {
      await cityService.getZipCodeByCoordinates(coordinates, token);
    } catch (e) {
      expect(e).toBeInstanceOf(RequestError);
      expect((e as RequestError).message).toStrictEqual('REQUEST_ERROR');
      expect((e as RequestError).data).toStrictEqual('Invalid token');
      expect((e as RequestError).status).toStrictEqual(HttpStatusCode.Unauthorized);
      expect(spy).toHaveBeenCalledWith(coordinates, token);
    }
  });
});
