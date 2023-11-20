import { container } from '@configs/ioc';
import { TYPES } from '@configs/types';

import { CityService } from './CityService';

export const cityService = container.get<CityService>(TYPES.cityService);
