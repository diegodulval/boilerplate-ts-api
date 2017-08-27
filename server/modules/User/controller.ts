import { Request, Response } from 'express';
import * as HTTPStatus from 'http-status';

import User from './service';

class UserController {

  public UserService: User;

  constructor() {
    this.UserService = new User();
  }

  public getAll(req: Request, res: Response) {
    this.UserService.getAll()
      .then((data) => {
        res.status(HTTPStatus.OK).json({
          payload: data,
        });
      })
      .catch((error) => {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
          payload: 'Erro ao buscar todos os usuários',
        });
      });
  }

  public createUser(req: Request, res: Response) {
    this.UserService.create(req.body)
      .then((data) => {
        res.status(HTTPStatus.OK).json({
          payload: data,
        });
      })
      .catch((error) => {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
          payload: 'Erro ao cadastrar novo usuário',
        });
      });
  }

  public getById(req: Request, res: Response) {
    const userId = parseInt(req.params.id, 10);
    this.UserService.getById(userId)
      .then((data) => {
        res.status(HTTPStatus.OK).json({
          payload: data,
        });
      })
      .catch((error) => {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
          payload: 'Erro ao buscar usuário',
        });
      });
  }

  public updateUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id, 10);
    const props = req.body;
    this.UserService.update(userId, props)
      .then((data) => {
        res.status(HTTPStatus.OK).json({
          payload: data,
        });
      })
      .catch((error) => {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
          payload: 'Erro ao atualizar usuário',
        });
      });
  }

  public deleteUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id, 10);
    this.UserService.delete(userId)
      .then((data) => {
        res.status(HTTPStatus.OK).json({
          payload: data,
        });
      })
      .catch((error) => {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
          payload: 'Erro ao deletar usuário',
        });
      });
  }
}

export default UserController;
