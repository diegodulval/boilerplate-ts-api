import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

export function errorHandlerApi(err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
  console.log(`API error handler foi executado: ${err}`); // tslint:disable-line
  res.status(500).json({
    errorCode: 'ERR-01',
    message: 'Erro Interno no Servidor',
  });
}
