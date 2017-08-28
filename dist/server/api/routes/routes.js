"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var auth_1 = require("../../modules/auth/auth");
var routes_1 = require("../../modules/User/routes");
var Routes = (function () {
    function Routes() {
        this.router = new routes_1.default();
        this.tokenRoute = new auth_1.default();
    }
    Routes.prototype.initRoutes = function (app, auth) {
        app.route('/api/users/all').all(auth.config().authenticate()).get(this.router.index);
        app.route('/api/users/:id').all(auth.config().authenticate()).get(this.router.findOne);
        app.route('/api/users/create').all(auth.config().authenticate()).post(this.router.create);
        app.route('/api/users/:id/update').all(auth.config().authenticate()).put(this.router.update);
        app.route('/api/users/:id/destroy').all(auth.config().authenticate()).delete(this.router.destroy);
        app.route('/token').post(this.tokenRoute.auth);
    };
    return Routes;
}());
exports.default = new Routes();
