import 'reflect-metadata';

import axios, { AxiosError, HttpStatusCode } from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { GoogleMapsApi } from '@api/GoogleMaps';
import { CityDto } from '@api/GoogleMaps/dtos/CityDTO';
import { Coordinates } from '@api/GoogleMaps/interfaces/coordinates';
import { LocationDetail } from '@api/GoogleMaps/interfaces/locationDetail';

import RequestError from '@error/RequestError';

describe('GoogleMapsApi - findCityByCoordinates', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('should call the Google Maps API and return the city data', async () => {
    const googleMapsApi = new GoogleMapsApi();

    const coordinates: Coordinates = { lat: '123', long: '456' };
    const responseExpected: LocationDetail = {
      results: [
        {
          address_components: [
            { long_name: '38540-000', short_name: '38540-000', types: ['postal_code'] },
            {
              long_name: 'Abadia dos Dourados',
              short_name: 'Abadia dos Dourados',
              types: ['administrative_area_level_2', 'political'],
            },
            {
              long_name: 'State of Minas Gerais',
              short_name: 'MG',
              types: ['administrative_area_level_1', 'political'],
            },
            { long_name: 'Brazil', short_name: 'BR', types: ['country', 'political'] },
          ],
          types: ['postal_code'],
        },
        {
          address_components: [
            {
              long_name: 'State of Minas Gerais',
              short_name: 'MG',
              types: ['administrative_area_level_1', 'political'],
            },
            { long_name: 'Brazil', short_name: 'BR', types: ['country', 'political'] },
          ],
          types: ['administrative_area_level_1', 'political'],
        },
      ],
    };
    const cityDto = CityDto.build(responseExpected);

    mockAxios.onGet('/geocode/json').reply(HttpStatusCode.Ok, responseExpected);

    const result = await googleMapsApi.findCityByCoordinates(coordinates);

    expect(result).toMatchObject(cityDto);
  });

  it('should throw an RequestError if it not find a city for the coordinates', async () => {
    expect.assertions(3);
    const googleMapsApi = new GoogleMapsApi();

    const coordinates: Coordinates = { lat: '123', long: '456' };

    const error = new AxiosError();
    mockAxios.onGet('/geocode/json').reply(HttpStatusCode.Unauthorized, error);

    try {
      await googleMapsApi.findZipCodeByCoordinates(coordinates);
    } catch (e) {
      expect(e).toBeInstanceOf(RequestError);
      expect((e as RequestError).message).toBe('REQUEST_ERROR');
      expect((e as RequestError).status).toBe(HttpStatusCode.Unauthorized);
    }
  });
});
