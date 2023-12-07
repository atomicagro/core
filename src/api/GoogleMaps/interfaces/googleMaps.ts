import { CityDto } from '@api/GoogleMaps/dtos/CityDTO';
import { ZipCodeDto } from '@api/GoogleMaps/dtos/ZipCodeDTO';
import { Coordinates } from '@api/GoogleMaps/interfaces/coordinates';

export interface GoogleMaps {
  findCityByCoordinates(coordenates: Coordinates): Promise<CityDto>;
  findZipCodeByCoordinates(coordenates: Coordinates): Promise<ZipCodeDto>;
  setToken(token: string): void;
}
