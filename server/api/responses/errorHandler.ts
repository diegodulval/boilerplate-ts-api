import { Response } from 'express';
import * as HTTPStatus from 'http-status';

export function onError(res: Response, message: string, error: any) {
  console.log(`Error: ${error}`); // tslint:disable-line
  res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(message);
}
