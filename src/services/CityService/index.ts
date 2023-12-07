import { inject, injectable } from 'inversify';

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

  setGoogleMapsToken(token: string) {
    this.googleMapsApi.setToken(token);
  }

  getZipCodeByCoordinates(coordinates: Coordinates) {
    return this.googleMapsApi.findZipCodeByCoordinates(coordinates);
  }

  getIbgeCodeByZipCode(zipCode: string) {
    return this.postmonApi.findIbgeCodeByZipCode(zipCode);
  }

  getCityByCoordinates(coordinates: Coordinates) {
    return this.googleMapsApi.findCityByCoordinates(coordinates);
  }
}

export { CityService };
