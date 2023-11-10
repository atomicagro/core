import { Error } from '@error/interfaces/Error';

export function parseError(error: any): Error {
  const e = {
    data: error && error.response && error.response.data,
    status: error && error.response && error.response.status,
  };

  return e;
}
