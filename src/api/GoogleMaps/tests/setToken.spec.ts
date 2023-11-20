import 'reflect-metadata';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { GoogleMapsApi } from '@api/GoogleMaps';

describe('GoogleMapsApi - setToken', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('should set token in defaults params', async () => {
    const googleMapsApi = new GoogleMapsApi();
    const token = 'TOKEN';

    const result = googleMapsApi.setToken(token);

    expect(result).toBeUndefined();
    expect(googleMapsApi.axios.defaults.params).toMatchObject({ key: token });
  });
});
