import { AddressComponent } from '@api/GoogleMaps/interfaces/addressComponent';
import { LocationDetail } from '@api/GoogleMaps/interfaces/locationDetail';
import { Result } from '@api/GoogleMaps/interfaces/result';
import { State } from '@api/GoogleMaps/interfaces/state';

export class CityDto {
  name: string;

  state: State;

  zipCode: string;

  static build(data: LocationDetail) {
    const cityDto = new CityDto();

    const results = data.results.find(this.findZipCode);

    const addressComponents = results?.address_components.find(this.findZipCode);
    const cityName = results?.address_components.find(this.findCityName);
    const state = results?.address_components.find(this.findState);

    cityDto.name = cityName?.long_name;
    cityDto.state = { uf: state?.short_name };
    cityDto.zipCode = addressComponents?.long_name;

    return cityDto;
  }

  static findZipCode(data: Result | AddressComponent) {
    return data.types.includes('postal_code') && data.types.length === 1;
  }

  static findState(data: AddressComponent) {
    return data.types.includes('administrative_area_level_1') && data.types.length === 2;
  }

  static findCityName(data: AddressComponent) {
    return data.types.includes('administrative_area_level_2') && data.types.length === 2;
  }
}
