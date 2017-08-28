"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPStatus = require("http-status");
function onSucess(res, data) {
    res.status(HTTPStatus.OK).json({ payload: data });
}
exports.onSucess = onSucess;
