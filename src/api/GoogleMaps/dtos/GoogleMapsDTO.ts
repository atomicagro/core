import { AddressComponent } from '@api/GoogleMaps/interfaces/addressComponent';
import { LocationDetail } from '@api/GoogleMaps/interfaces/locationDetail';
import { Result } from '@api/GoogleMaps/interfaces/result';

export class GoogleMapsDto {
  zipCode: string;

  static build(data: LocationDetail) {
    const googleMapsDto = new GoogleMapsDto();

    const results = data.results.find(this.findZipCode);
    const addressComponents = results?.address_components.find(this.findZipCode);

    googleMapsDto.zipCode = addressComponents?.long_name;

    return googleMapsDto;
  }

  static findZipCode(data: Result | AddressComponent) {
    return data.types.includes('postal_code') && data.types.length === 1;
  }
}
