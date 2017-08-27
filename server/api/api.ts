import * as bodyParser from 'body-parser';
import * as express from 'express';
import { Application } from 'express';
import * as morgan from 'morgan';
import { errorHandlerApi } from './errorHandlerApi';

import Routes from './routes/routes';

class Api {

  public express: Application;
  public auth;

  constructor() {
    this.express = express();
    this.middleware();
  }

  public middleware(): void {
    this.express.use(morgan('dev'));
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());
    this.express.use(errorHandlerApi);
    this.router(this.express, this.auth);
  }

  public router(app: Application, auth: any): void {
    new Routes(app, auth); //tslint:disable-line
  }

}

export default new Api().express;
