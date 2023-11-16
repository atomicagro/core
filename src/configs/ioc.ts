import 'reflect-metadata';

import { Container } from 'inversify';

import { configureApi } from '@api/ioc';

import { configureService } from '@services/ioc';

export const container = new Container();

export function configureContainer() {
  configureApi(container);
  configureService(container);

  return container;
}
