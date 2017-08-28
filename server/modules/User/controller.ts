import { Request, Response } from "express";
import * as HTTPStatus from "http-status";
import * as _ from "lodash";

import Handlers from "../../api/responses/handlers";

import User from "./service";

class UserController {
  public getAll(req: Request, res: Response) {
    User.getAll()
      .then(_.partial(Handlers.onSucess, res))
      .catch(
        _.partial(Handlers.onError, res, "Erro ao buscar todos os usuários")
      );
  }

  public createUser(req: Request, res: Response) {
    User.create(req.body)
      .then(_.partial(Handlers.onSucess, res))
      .catch(_.partial(Handlers.dbErrorHandler, res))
      .catch(_.partial(Handlers.onError, res, "Erro ao inserir novo usuário"));
  }

  public getById(req: Request, res: Response) {
    const userId = parseInt(req.params.id, 10);
    User.getById(userId)
      .then(_.partial(Handlers.onSucess, res))
      .catch(_.partial(Handlers.onError, res, "Usuario não encontrado"));
  }

  public updateUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id, 10);
    const props = req.body;
    User.update(userId, props)
      .then(_.partial(Handlers.onSucess, res))
      .catch(_.partial(Handlers.onError, res, "Erro ao atualizar usuário"));
  }

  public deleteUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id, 10);
    User.delete(userId)
      .then(_.partial(Handlers.onSucess, res))
      .catch(_.partial(Handlers.onError, res, "Erro ao excluir usuário"));
  }
}

export default new UserController();
