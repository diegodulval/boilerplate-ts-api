"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPStatus = require("http-status");
var bcrypt = require("bcryptjs");
var jwt = require("jwt-simple");
var config = require("../../config/env/config")();
var Handlers = (function () {
    function Handlers() {
    }
    Handlers.prototype.onSucess = function (res, data) {
        res.status(HTTPStatus.OK).json({ payload: data });
    };
    Handlers.prototype.onError = function (res, message, error) {
        console.log("Error: " + error); // tslint:disable-line
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(message);
    };
    Handlers.prototype.authSucess = function (res, credentials, data) {
        var isMatch = bcrypt.compareSync(credentials.password, data.password);
        if (isMatch) {
            var payload = { id: data.id };
            res.json({
                token: jwt.encode(payload, config.secret)
            });
        }
        else {
            res.sendStatus(HTTPStatus.UNAUTHORIZED);
        }
    };
    Handlers.prototype.authFail = function (req, res) {
        res.sendStatus(HTTPStatus.UNAUTHORIZED);
    };
    Handlers.prototype.errorHandlerApi = function (err, req, res, next) {
        console.log("API error handler foi executado: " + err); // tslint:disable-line
        res.status(500).json({
            errorCode: "ERR-01",
            message: "Erro Interno no Servidor",
        });
    };
    Handlers.prototype.dbErrorHandler = function (res, error) {
        console.log("Um Erro aconteceu: " + error); // tslint:disable-line
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
            code: "ERR-01",
            message: "Erro ao criar usuário",
        });
    };
    return Handlers;
}());
exports.default = new Handlers();
