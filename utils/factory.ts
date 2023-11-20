import { LocationDetail } from '@api/GoogleMaps/interfaces/locationDetail';
import { CityInfo } from '@api/Postmon/interfaces/cityInfo';

export class Factory {
  static makeLocationDetail(zipCode: string) {
    return {
      results: [
        {
          address_components: [{ long_name: zipCode, short_name: zipCode, types: ['postal_code'] }],
          types: ['postal_code'],
        },
      ],
    } as LocationDetail;
  }

  static makeCityInfo(ibgeCode: string) {
    return {
      cidade_info: { codigo_ibge: ibgeCode },
    } as CityInfo;
  }
}
