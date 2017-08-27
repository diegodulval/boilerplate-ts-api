import { Request, Response } from 'express';
import * as _ from 'lodash';

import authFail from '../../api/responses/authFail';
import authSucess from '../../api/responses/authSucess';
import User from '../User/service';

const UserService = new User();

class TokenRoutes {
  public auth(req: Request, res: Response) {
    const credentials = {
      email: req.body.email,
      password: req.body.password,
    }

    if (credentials.hasOwnProperty('email') && credentials.hasOwnProperty('password')) {
      UserService
        .getById(credentials.email)
        .then(_.partial(authSucess, res, credentials))
        .catch(_.partial(authFail, req, res));
    }
  }
}

export default TokenRoutes;

