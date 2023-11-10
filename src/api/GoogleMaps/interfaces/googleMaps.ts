import { GoogleMapsDto } from '@api/GoogleMaps/dtos/GoogleMapsDTO';
import { Coordinates } from '@api/GoogleMaps/interfaces/coordinates';

export interface GoogleMaps {
  findZipCodeByCoordinates(coordenates: Coordinates, token: string): Promise<GoogleMapsDto>;
}
