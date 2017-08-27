import { Response } from 'express';
import * as HTTPStatus from 'http-status';

export function dbErrorHandler(res: Response, error: any) {
  console.log(`Um Erro aconteceu: ${error}`); // tslint:disable-line
  res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
    code: 'ERR-01',
    message: 'Erro ao criar usuário',
  });
}
