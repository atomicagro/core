import 'reflect-metadata';

import { GoogleMaps } from '@api/GoogleMaps/interfaces/googleMaps';
import { Postmon } from '@api/Postmon/interfaces/postmon';

import { container } from '@configs/ioc';
import { TYPES } from '@configs/types';

import { CityService } from '@services/CityService';

describe('CityService - setGoogleMapsToken', () => {
  beforeEach(() => container.snapshot());

  afterEach(() => container.restore());

  it('should return undefined when set token in google maps api', async () => {
    const token = 'TOKEN';

    const spy = jest.fn().mockReturnValue(undefined);

    container
      .bind<GoogleMaps>(TYPES.googleMaps)
      .toConstantValue({ findZipCodeByCoordinates: jest.fn(), setToken: spy });
    container.bind<Postmon>(TYPES.postmon).toConstantValue({ findIbgeCodeByZipCode: jest.fn() });

    const cityService = new CityService(
      container.get<GoogleMaps>(TYPES.googleMaps),
      container.get<Postmon>(TYPES.postmon),
    );

    const result = cityService.setGoogleMapsToken(token);

    expect(result).toBeUndefined();
    expect(spy).toHaveBeenCalledWith(token);
  });
});
