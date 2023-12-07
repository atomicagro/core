import 'reflect-metadata';

import { HttpStatusCode } from 'axios';

import { GoogleMapsApi } from '@api/GoogleMaps';
import { GoogleMaps } from '@api/GoogleMaps/interfaces/googleMaps';
import { State } from '@api/GoogleMaps/interfaces/state';
import { PostmonApi } from '@api/Postmon';
import { Postmon } from '@api/Postmon/interfaces/postmon';

import { container } from '@configs/ioc';
import { TYPES } from '@configs/types';

import RequestError from '@error/RequestError';

import { CityService } from '@services/CityService';

describe('CityService - getCityByCoordinates', () => {
  beforeEach(() => container.snapshot());

  afterEach(() => container.restore());

  it('should return city', async () => {
    const coordinates = { lat: '123', long: '456' };
    const zipCode = '92440-540';
    const cityName = 'Canoas';
    const state: State = { uf: 'RS' };

    const googleMapsApi = new GoogleMapsApi();
    const postmonApi = new PostmonApi();

    const spy = jest
      .spyOn(googleMapsApi, 'findCityByCoordinates')
      .mockResolvedValue({ name: cityName, state, zipCode });

    container.bind<GoogleMaps>(TYPES.googleMaps).toConstantValue(googleMapsApi);
    container.bind<Postmon>(TYPES.postmon).toConstantValue(postmonApi);
    container.bind<CityService>(TYPES.cityService).to(CityService);

    const cityService = container.get<CityService>(TYPES.cityService);

    const result = await cityService.getCityByCoordinates(coordinates);

    expect(result).toMatchObject({ name: cityName, state, zipCode });
    expect(spy).toHaveBeenCalledWith(coordinates);
  });

  it('should return throw error when invalid token', async () => {
    expect.assertions(5);

    const coordinates = { lat: '123', long: '456' };
    const googleMapsApi = new GoogleMapsApi();
    const postmonApi = new PostmonApi();

    const spy = jest
      .spyOn(googleMapsApi, 'findCityByCoordinates')
      .mockRejectedValue(new RequestError({ data: 'Invalid token', status: HttpStatusCode.Unauthorized }));

    container.bind<GoogleMaps>(TYPES.googleMaps).toConstantValue(googleMapsApi);
    container.bind<Postmon>(TYPES.postmon).toConstantValue(postmonApi);
    container.bind<CityService>(TYPES.cityService).to(CityService);

    const cityService = container.get<CityService>(TYPES.cityService);

    try {
      await cityService.getCityByCoordinates(coordinates);
    } catch (e) {
      expect(e).toBeInstanceOf(RequestError);
      expect((e as RequestError).message).toStrictEqual('REQUEST_ERROR');
      expect((e as RequestError).data).toStrictEqual('Invalid token');
      expect((e as RequestError).status).toStrictEqual(HttpStatusCode.Unauthorized);
      expect(spy).toHaveBeenCalledWith(coordinates);
    }
  });
});
