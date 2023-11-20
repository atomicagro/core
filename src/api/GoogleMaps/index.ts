import axios, { AxiosError, AxiosInstance } from 'axios';
import { injectable } from 'inversify';

import { GoogleMapsDto } from '@api/GoogleMaps/dtos/GoogleMapsDTO';
import { Coordinates } from '@api/GoogleMaps/interfaces/coordinates';
import { GoogleMaps } from '@api/GoogleMaps/interfaces/googleMaps';
import { LocationDetail } from '@api/GoogleMaps/interfaces/locationDetail';

import { parseError } from '@error/parseError';
import RequestError from '@error/RequestError';

@injectable()
export class GoogleMapsApi implements GoogleMaps {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({ baseURL: 'https://maps.googleapis.com/maps/api' });
  }

  setToken(token: string) {
    this.axios.defaults.params = { key: token };
  }

  async findZipCodeByCoordinates(coordinates: Coordinates) {
    const { lat, long } = coordinates;
    const params = {
      latlng: `${lat},${long}`,
      result_type: ['postal_code', 'administrative_area_level_2'],
    };

    try {
      const { data } = await this.axios.get<LocationDetail>('/geocode/json', { params });

      return GoogleMapsDto.build(data);
    } catch (e) {
      if ((e as AxiosError).response) throw new RequestError(parseError(e));
      throw e;
    }
  }
}
