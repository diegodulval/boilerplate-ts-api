"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPStatus = require("http-status");
function dbErrorHandler(res, error) {
    console.log("Um Erro aconteceu: " + error); // tslint:disable-line
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
        code: 'ERR-01',
        message: 'Erro ao criar usuário',
    });
}
exports.dbErrorHandler = dbErrorHandler;
