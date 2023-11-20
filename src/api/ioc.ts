import { Container } from 'inversify';

import { GoogleMaps } from '@api/GoogleMaps/interfaces/googleMaps';
import { Postmon } from '@api/Postmon/interfaces/postmon';

import { TYPES } from '@configs/types';

import { GoogleMapsApi } from './GoogleMaps';
import { PostmonApi } from './Postmon';

export function configure(container: Container) {
  container.bind<GoogleMaps>(TYPES.googleMaps).to(GoogleMapsApi).inSingletonScope();
  container.bind<Postmon>(TYPES.postmon).to(PostmonApi).inSingletonScope();
}
