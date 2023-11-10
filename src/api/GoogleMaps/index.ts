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
  url: string;

  constructor() {
    this.url = 'https://maps.googleapis.com/maps/api/geocode/json';
    this.axios = axios.create();
  }

  async findZipCodeByCoordinates(coordinates: Coordinates, token: string) {
    const { lat, long } = coordinates;
    const params = {
      key: token,
      latlng: `${lat},${long}`,
      result_type: ['postal_code', 'administrative_area_level_2'],
    };

    try {
      const { data } = await this.axios.get<LocationDetail>(this.url, { params });

      return GoogleMapsDto.build(data);
    } catch (e) {
      if ((e as AxiosError).response) throw new RequestError(parseError(e));
      throw e;
    }
  }
}
