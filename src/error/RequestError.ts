import { Error as ReqError } from '@error/interfaces/Error';

class RequestError<Data = any> extends Error implements ReqError<Data> {
  data: Data;

  status: number;

  constructor({ data, status }: ReqError<Data>) {
    super('REQUEST_ERROR');

    this.data = data;
    this.status = status;
  }
}

export default RequestError;
