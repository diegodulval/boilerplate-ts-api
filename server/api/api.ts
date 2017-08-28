import * as bodyParser from 'body-parser';
import * as express from 'express';
import { Application } from 'express';
import * as morgan from 'morgan';

import AuthConfig from '../auth';
import { errorHandlerApi } from './errorHandlerApi';

import Routes from './routes/routes';

class Api {

  public express: Application;
  public auth;

  constructor() {
    this.express = express();
    this.auth = AuthConfig();
    this.middleware();
  }

  public middleware(): void {
    this.express.use(morgan('dev'));
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());
    this.express.use(errorHandlerApi);
    this.express.use(this.auth.initialize());
    this.router(this.express, this.auth);
  }

  public router(app: Application, auth: any): void {
    Routes.initRoutes(app, auth);
  }

}

export default new Api().express;
