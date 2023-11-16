import 'reflect-metadata';

import { HttpStatusCode } from 'axios';

import { GoogleMaps } from '@api/GoogleMaps/interfaces/googleMaps';
import { Postmon } from '@api/Postmon/interfaces/postmon';

import { container } from '@configs/ioc';
import { TYPES } from '@configs/types';

import RequestError from '@error/RequestError';

import { CityService } from '@services/CityService';

describe('CityService - getZipCodeByCoordinates', () => {
  beforeEach(() => container.snapshot());

  afterEach(() => container.restore());

  it('should return zipcode', async () => {
    const coordinates = { lat: '123', long: '456' };
    const token = 'TOKEN';
    const zipCode = '92440-540';

    const findZipCodeByCoordinatesSpy = jest.fn().mockResolvedValue({ zipCode });
    const setTokenSpy = jest.fn().mockReturnValue(undefined);
    container
      .bind<GoogleMaps>(TYPES.googleMaps)
      .toConstantValue({ findZipCodeByCoordinates: findZipCodeByCoordinatesSpy, setToken: setTokenSpy });
    container.bind<Postmon>(TYPES.postmon).toConstantValue({ findIbgeCodeByZipCode: jest.fn() });

    const cityService = new CityService(
      container.get<GoogleMaps>(TYPES.googleMaps),
      container.get<Postmon>(TYPES.postmon),
    );

    cityService.setGoogleMapsToken(token);
    const result = await cityService.getZipCodeByCoordinates(coordinates);

    expect(result).toMatchObject({ zipCode });
    expect(findZipCodeByCoordinatesSpy).toHaveBeenCalledWith(coordinates);
    expect(setTokenSpy).toHaveBeenCalledWith(token);
  });

  it('should return throw error when invalid token', async () => {
    expect.assertions(6);

    const coordinates = { lat: '123', long: '456' };
    const token = 'TOKEN';

    const findZipCodeByCoordinatesSpy = jest
      .fn()
      .mockRejectedValue(new RequestError({ data: 'Invalid token', status: HttpStatusCode.Unauthorized }));

    const setTokenSpy = jest.fn().mockReturnValue(undefined);

    container
      .bind<GoogleMaps>(TYPES.googleMaps)
      .toConstantValue({ findZipCodeByCoordinates: findZipCodeByCoordinatesSpy, setToken: setTokenSpy });
    container.bind<Postmon>(TYPES.postmon).toConstantValue({ findIbgeCodeByZipCode: jest.fn() });

    const cityService = new CityService(
      container.get<GoogleMaps>(TYPES.googleMaps),
      container.get<Postmon>(TYPES.postmon),
    );

    try {
      cityService.setGoogleMapsToken(token);
      await cityService.getZipCodeByCoordinates(coordinates);
    } catch (e) {
      expect(e).toBeInstanceOf(RequestError);
      expect((e as RequestError).message).toStrictEqual('REQUEST_ERROR');
      expect((e as RequestError).data).toStrictEqual('Invalid token');
      expect((e as RequestError).status).toStrictEqual(HttpStatusCode.Unauthorized);
      expect(findZipCodeByCoordinatesSpy).toHaveBeenCalledWith(coordinates);
      expect(setTokenSpy).toHaveBeenCalledWith(token);
    }
  });
});
