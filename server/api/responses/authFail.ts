import { Request, Response } from 'express';
import * as HTTPStatus from 'http-status';

export default function authFail(req: Request, res: Response) {
  res.sendStatus(HTTPStatus.UNAUTHORIZED);
}
