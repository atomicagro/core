import 'reflect-metadata';

import { Container } from 'inversify';

import { configureApi } from '@api/inverse';

import { configureService } from '@services/invese';

export const container = new Container();

export function configureContainer() {
  configureApi(container);
  configureService(container);

  return container;
}
