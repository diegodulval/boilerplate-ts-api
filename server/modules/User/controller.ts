import { Request, Response } from 'express';
import * as HTTPStatus from 'http-status';

class UserController {
  constructor() { }

  public getAll(req: Request, res: Response) {
    res.status(HTTPStatus.OK).json({
      message: 'OK',
    });
  }

  public createUser(req: Request, res: Response) {
    res.status(HTTPStatus.OK).json({
      message: 'OK',
    });
  }

  public getById(req: Request, res: Response) {
    res.status(HTTPStatus.OK).json({
      message: 'OK',
    });
  }

  public updateUser(req: Request, res: Response) {
    res.status(HTTPStatus.OK).json({
      message: 'OK',
    });
  }

  public deleteUser(req: Request, res: Response) {
    res.status(HTTPStatus.OK).json({
      message: 'OK',
    });
  }
}

export default UserController;
