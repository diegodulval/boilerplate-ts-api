"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcryptjs");
var HTTPStatus = require("http-status");
var jwt = require("jwt-simple");
var config = require('../../config/env/config')();
function authSucess(res, credentials, data) {
    var isMatch = bcrypt.compareSync(credentials.password, data.password);
    if (isMatch) {
        var payload = { id: data.id };
        res.json({
            token: jwt.encode(payload, config.secret),
        });
    }
    else {
        res.sendStatus(HTTPStatus.UNAUTHORIZED);
    }
}
exports.default = authSucess;
