import { Container } from 'inversify';

import { TYPES } from '@configs/types';

import { CityService } from './CityService';

export function configure(container: Container) {
  container.bind<CityService>(TYPES.cityService).to(CityService).inSingletonScope();
}
