import { AddressComponent } from '@api/GoogleMaps/interfaces/addressComponent';
import { LocationDetail } from '@api/GoogleMaps/interfaces/locationDetail';
import { Result } from '@api/GoogleMaps/interfaces/result';

export class ZipCodeDto {
  zipCode: string;

  static build(data: LocationDetail) {
    const zipCodeDto = new ZipCodeDto();

    const results = data.results.find(this.findZipCode);
    const addressComponents = results?.address_components.find(this.findZipCode);

    zipCodeDto.zipCode = addressComponents?.long_name;

    return zipCodeDto;
  }

  static findZipCode(data: Result | AddressComponent) {
    return data.types.includes('postal_code') && data.types.length === 1;
  }
}
