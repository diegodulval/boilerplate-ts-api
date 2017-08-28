import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import * as HTTPStatus from "http-status";

import * as bcrypt from "bcryptjs";
import * as jwt from "jwt-simple";

const config = require("../../config/env/config")();

class Handlers {
  public onSucess(res: Response, data: any) {
    res.status(HTTPStatus.OK).json({ payload: data });
  }

  public onError(res: Response, message: string, error: any) {
    console.log(`Error: ${error}`); // tslint:disable-line
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(message);
  }

  public authSucess(res: Response, credentials: any, data: any) {
    const isMatch = bcrypt.compareSync(credentials.password, data.password);

    if (isMatch) {
      const payload = { id: data.id };
      res.json({
        token: jwt.encode(payload, config.secret)
      });
    } else {
      res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }
  }

  public authFail(req: Request, res: Response) {
    res.sendStatus(HTTPStatus.UNAUTHORIZED);
  }

  public errorHandlerApi(
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    console.log(`API error handler foi executado: ${err}`); // tslint:disable-line
    res.status(500).json({
      errorCode: "ERR-01",
      message: "Erro Interno no Servidor",
    });
  }

  public dbErrorHandler(res: Response, error: any) {
    console.log(`Um Erro aconteceu: ${error}`); // tslint:disable-line
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
      code: "ERR-01",
      message: "Erro ao criar usuário",
    });
  }
}

export default new Handlers();
