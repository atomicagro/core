import { GoogleMapsDto } from '@api/GoogleMaps/dtos/GoogleMapsDTO';
import { LocationDetail } from '@api/GoogleMaps/interfaces/locationDetail';

describe('GoogleMapsDTO', () => {
  it('should return a valid GoogleMapsDTO object', async () => {
    const data: LocationDetail = {
      results: [
        {
          address_components: [
            { long_name: '38540-000', short_name: '38540-000', types: ['postal_code'] },
            {
              long_name: 'Abadia dos Dourados',
              short_name: 'Abadia dos Dourados',
              types: ['administrative_area_level_2', 'political'],
            },
            {
              long_name: 'State of Minas Gerais',
              short_name: 'MG',
              types: ['administrative_area_level_1', 'political'],
            },
            { long_name: 'Brazil', short_name: 'BR', types: ['country', 'political'] },
          ],
          types: ['postal_code'],
        },
        {
          address_components: [
            {
              long_name: 'State of Minas Gerais',
              short_name: 'MG',
              types: ['administrative_area_level_1', 'political'],
            },
            { long_name: 'Brazil', short_name: 'BR', types: ['country', 'political'] },
          ],
          types: ['administrative_area_level_1', 'political'],
        },
      ],
    };
    const googleMapsDto = GoogleMapsDto.build(data);

    expect(googleMapsDto.zipCode).toStrictEqual(data.results[0].address_components[0].long_name);

    expect(Object.keys(googleMapsDto)).toHaveLength(1);
  });
});
