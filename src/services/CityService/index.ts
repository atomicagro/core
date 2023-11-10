import { injectable, inject } from 'inversify';

import { Coordinates } from '@api/GoogleMaps/interfaces/coordinates';
import { GoogleMaps } from '@api/GoogleMaps/interfaces/googleMaps';
import { Postmon } from '@api/Postmon/interfaces/postmon';

import { TYPES } from '@configs/types';

@injectable()
class CityService {
  private googleMapsApi: GoogleMaps;
  private postmonApi: Postmon;

  constructor(@inject(TYPES.googleMaps) googleMapsApi: GoogleMaps, @inject(TYPES.postmon) postmonApi: Postmon) {
    this.googleMapsApi = googleMapsApi;
    this.postmonApi = postmonApi;
  }

  async getZipCodeByCoordinates(coordinates: Coordinates, token: string) {
    return await this.googleMapsApi.findZipCodeByCoordinates(coordinates, token);
  }

  async getIbgeCodeByZipCode(zipCode: string) {
    return await this.postmonApi.findIbgeCodeByZipCode(zipCode);
  }
}

export { CityService };
