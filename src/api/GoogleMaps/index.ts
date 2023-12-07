import axios, { AxiosError, AxiosInstance } from 'axios';
import { injectable } from 'inversify';

import { CityDto } from '@api/GoogleMaps/dtos/CityDTO';
import { ZipCodeDto } from '@api/GoogleMaps/dtos/ZipCodeDTO';
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
    const { data } = await this.request(coordinates);

    return ZipCodeDto.build(data);
  }

  async findCityByCoordinates(coordinates: Coordinates) {
    const { data } = await this.request(coordinates);

    return CityDto.build(data);
  }

  async request(coordinates: Coordinates) {
    const { lat, long } = coordinates;
    const params = {
      latlng: `${lat},${long}`,
      result_type: ['postal_code', 'administrative_area_level_2'],
    };

    try {
      return await this.axios.get<LocationDetail>('/geocode/json', { params });
    } catch (e) {
      if ((e as AxiosError).response) throw new RequestError(parseError(e));
      throw e;
    }
  }
}
