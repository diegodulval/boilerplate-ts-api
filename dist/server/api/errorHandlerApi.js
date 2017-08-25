"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandlerApi(err, req, res, next) {
    console.log("API error handler foi executado: " + err); // tslint:disable-line
    res.status(500).json({
        errorCode: 'ERR-01',
        message: 'Erro Interno no Servidor',
    });
}
exports.errorHandlerApi = errorHandlerApi;
