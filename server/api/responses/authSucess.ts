import { Request, Response } from 'express';
import * as HTTPStatus from 'http-status';
import * as jwt from 'jwt-simple';

const config = require('../../config/env/config')();

export default function authSucess(res: Response, credentials: any, data: any) {
  const isMatch = (credentials.password === data.password);

  if (isMatch) {
    const payload = { id: data.id };
    res.json({
      token: jwt.encode(payload, config.secret),
    });
  } else {
    res.sendStatus(HTTPStatus.UNAUTHORIZED);
  }
}
