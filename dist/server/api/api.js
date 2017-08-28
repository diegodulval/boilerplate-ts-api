"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var express = require("express");
var morgan = require("morgan");
var auth_1 = require("../auth");
var errorHandlerApi_1 = require("./errorHandlerApi");
var routes_1 = require("./routes/routes");
var Api = (function () {
    function Api() {
        this.express = express();
        this.auth = auth_1.default();
        this.middleware();
    }
    Api.prototype.middleware = function () {
        this.express.use(morgan('dev'));
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(bodyParser.json());
        this.express.use(errorHandlerApi_1.errorHandlerApi);
        this.express.use(this.auth.initialize());
        this.router(this.express, this.auth);
    };
    Api.prototype.router = function (app, auth) {
        routes_1.default.initRoutes(app, auth);
    };
    return Api;
}());
exports.default = new Api().express;
