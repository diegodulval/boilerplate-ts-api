"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HTTPStatus = require("http-status");
function onError(res, message, error) {
    console.log("Error: " + error); // tslint:disable-line
    res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send(message);
}
exports.onError = onError;
