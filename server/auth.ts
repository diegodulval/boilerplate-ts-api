import * as passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import AuthConfig from "./auth";
import User from "./modules/User/service";

const config = require("./config/env/config")();

class Auth {
  public config() {
    const opts = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
      secretOrKey: config.secret,
    };

    passport.use(
      new Strategy(opts, (jwtPayload, done) => {
        User.getById(jwtPayload.id)
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
      authenticate: () => passport.authenticate('jwt', { session: false }),
      initialize: () => passport.initialize(),
    };
  }
}

export default new Auth();
