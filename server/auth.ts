import * as passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import AuthConfig from "./auth";
import User from "./modules/User/service";

const config = require("./config/env/config")();

class Auth {
  config() {
    const UserService = new User();
    let opts = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
      secretOrKey: config.secret,
    };

    passport.use(
      new Strategy(opts, (jwtPayload, done) => {
        UserService.getById(jwtPayload.id)
          .then(user => {
            if (user) {
              return done(null, {
                id: user.id,
                email: user.email,
              });
            }
            return done(null, false);
          })
          .catch(error => {
            done(error, null);
          });
      }));

    return {
      initialize: () => passport.initialize(),
      authenticate: () => passport.authenticate('jwt', { session: false }),
    };
  }
}

export default new Auth();
