"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var authFail_1 = require("../../api/responses/authFail");
var authSucess_1 = require("../../api/responses/authSucess");
var service_1 = require("../User/service");
var TokenRoutes = (function () {
    function TokenRoutes() {
    }
    TokenRoutes.prototype.auth = function (req, res) {
        var credentials = {
            email: req.body.email,
            password: req.body.password,
        };
        if (credentials.hasOwnProperty('email') && credentials.hasOwnProperty('password')) {
            service_1.default
                .getByEmail(credentials.email)
                .then(_.partial(authSucess_1.default, res, credentials))
                .catch(_.partial(authFail_1.default, req, res));
        }
    };
    return TokenRoutes;
}());
exports.default = new TokenRoutes();
