import 'reflect-metadata';

import { GoogleMapsApi } from '@api/GoogleMaps';
import { GoogleMaps } from '@api/GoogleMaps/interfaces/googleMaps';
import { PostmonApi } from '@api/Postmon';
import { Postmon } from '@api/Postmon/interfaces/postmon';

import { container } from '@configs/ioc';
import { TYPES } from '@configs/types';

import { CityService } from '@services/CityService';

describe('CityService - setGoogleMapsToken', () => {
  beforeEach(() => container.snapshot());

  afterEach(() => container.restore());

  it('should return undefined when set token in google maps api', async () => {
    const token = 'TOKEN';

    const googleMapsApi = new GoogleMapsApi();
    const postmonApi = new PostmonApi();

    const spy = jest.spyOn(googleMapsApi, 'setToken').mockReturnValue(undefined);

    container.bind<GoogleMaps>(TYPES.googleMaps).toConstantValue(googleMapsApi);
    container.bind<Postmon>(TYPES.postmon).toConstantValue(postmonApi);
    container.bind<CityService>(TYPES.cityService).to(CityService);

    const cityService = container.get<CityService>(TYPES.cityService);

    const result = cityService.setGoogleMapsToken(token);

    expect(result).toBeUndefined();
    expect(spy).toHaveBeenCalledWith(token);
  });
});
