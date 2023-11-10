import { GoogleMapsDto } from '@api/dtos/GoogleMapsDTO';
import { Coordinates } from '@api/interfaces/coordinates';

export interface GoogleMaps {
  findZipCodeByCoordinates(coordenates: Coordinates, token: string): Promise<GoogleMapsDto>;
}
