import 'reflect-metadata';

import { Container } from 'inversify';

import { configure as configureApi } from '@api/ioc';

import { configure as configureService } from '@services/ioc';

export const container = new Container();

export function configure() {
  configureApi(container);
  configureService(container);

  return container;
}
