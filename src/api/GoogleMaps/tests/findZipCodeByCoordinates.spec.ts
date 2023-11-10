import 'reflect-metadata';

import axios, { AxiosError, HttpStatusCode } from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { GoogleMapsApi } from '@api/GoogleMaps';

import RequestError from '@error/RequestError';

import { Factory } from '@utils/factory';

describe('GoogleMapsApi', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('should call the Google Maps API and return the zip code data', async () => {
    const googleMapsApi = new GoogleMapsApi();

    const coordinates = { lat: '123', long: '456' };
    const token = 'TOKEN';
    const zipCode = '38540-000';

    const expectedData = Factory.makeLocationDetail(zipCode);

    mockAxios.onGet('https://maps.googleapis.com/maps/api/geocode/json').reply(HttpStatusCode.Ok, expectedData);

    const result = await googleMapsApi.findZipCodeByCoordinates(coordinates, token);

    expect(result).toMatchObject({ zipCode });
  });

  it('should throw an RequestError if it not find a zip code for the coordinates', async () => {
    expect.assertions(3);
    const googleMapsApi = new GoogleMapsApi();

    const coordinates = { lat: '123', long: '456' };
    const token = 'TOKEN';

    const error = new AxiosError();
    mockAxios.onGet('https://maps.googleapis.com/maps/api/geocode/json').reply(HttpStatusCode.Unauthorized, error);

    try {
      await googleMapsApi.findZipCodeByCoordinates(coordinates, token);
    } catch (e) {
      expect(e).toBeInstanceOf(RequestError);
      expect((e as RequestError).message).toBe('REQUEST_ERROR');
      expect((e as RequestError).status).toBe(HttpStatusCode.Unauthorized);
    }
  });
});
