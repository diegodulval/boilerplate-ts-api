"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPStatus = require("http-status");
function authFail(req, res) {
    res.sendStatus(HTTPStatus.UNAUTHORIZED);
}
exports.default = authFail;
