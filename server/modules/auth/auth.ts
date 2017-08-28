import { Request, Response } from "express";
import * as _ from "lodash";

import Handlers from "../../api/responses/handlers";
import User from "../User/service";

class TokenRoutes {
  public auth(req: Request, res: Response) {
    const credentials = {
      email: req.body.email,
      password: req.body.password
    };

    if (
      credentials.hasOwnProperty("email") &&
      credentials.hasOwnProperty("password")
    ) {
      User.getByEmail(credentials.email)
        .then(_.partial(Handlers.authSucess, res, credentials))
        .catch(_.partial(Handlers.authFail, req, res));
    }
  }
}

export default new TokenRoutes();
