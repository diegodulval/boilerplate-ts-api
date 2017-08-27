import { Request, Response } from 'express';
import * as HTTPStatus from 'http-status';
import * as _ from 'lodash';

import { onError } from '../../api/responses/errorHandler';
import { onSucess } from '../../api/responses/sucessHandler';
import { dbErrorHandler } from '../../config/dbErrorHandler';

import User from './service';

class UserController {

  public UserService: User;

  constructor() {
    this.UserService = new User();
  }

  public getAll(req: Request, res: Response) {
    this.UserService.getAll()
      .then(_.partial(onSucess, res))
      .catch(_.partial(onError, res, 'Erro ao buscar todos os usuários'));
  }

  public createUser(req: Request, res: Response) {
    this.UserService.create(req.body)
      .then(_.partial(onSucess, res))
      .catch(_.partial(dbErrorHandler, res))
      .catch(_.partial(onError, res, 'Erro ao inserir novo usuário'));
  }

  public getById(req: Request, res: Response) {
    const userId = parseInt(req.params.id, 10);
    this.UserService.getById(userId)
      .then(_.partial(onSucess, res))
      .catch(_.partial(onError, res, 'Usuario não encontrado'));
  }

  public updateUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id, 10);
    const props = req.body;
    this.UserService.update(userId, props)
      .then(_.partial(onSucess, res))
      .catch(_.partial(onError, res, 'Erro ao atualizar usuário'));
  }

  public deleteUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id, 10);
    this.UserService.delete(userId)
      .then(_.partial(onSucess, res))
      .catch(_.partial(onError, res, 'Erro ao excluir usuário'));
  }
}

export default UserController;
