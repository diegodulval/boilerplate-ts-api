import { Application, Request, Response } from 'express';
import UserRoutes from '../../modules/User/routes';

class Routes {

  private router: UserRoutes;
  private tokenRoute;
  private auth;

  constructor(app: Application, auth: any) {
    this.router = new UserRoutes();
    this.auth = auth;
    this.getRoutes(app);
  }

  public getRoutes(app: Application): void {
    app.route('/api/users/all').get(this.router.index);
    app.route('/api/users/:id').get(this.router.findOne);
    app.route('/api/users/create').post(this.router.create);
    app.route('/api/users/:id/update').put(this.router.update);
    app.route('/api/users/:id/destroy').delete(this.router.destroy);
    app.route('/token').post(this.tokenRoute.auth);

  }
}

export default Routes;
