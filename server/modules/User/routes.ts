import { Request, Response } from "express";
import UserController from "./controller";

class UserRoutes {
  public index(req: Request, res: Response) {
    return UserController.getAll(req, res);
  }
  public findOne(req: Request, res: Response) {
    return UserController.getById(req, res);
  }
  public create(req: Request, res: Response) {
    return UserController.createUser(req, res);
  }
  public update(req: Request, res: Response) {
    return UserController.updateUser(req, res);
  }
  public destroy(req: Request, res: Response) {
    return UserController.deleteUser(req, res);
  }
}

export default new UserRoutes();
