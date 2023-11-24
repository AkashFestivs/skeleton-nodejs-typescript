"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
const http_constants_1 = require("../constants/http.constants");
class CustomError extends Error {
    constructor(err) {
        super(err.message);
        this.name = 'CustomError';
        this.moduleName = err.moduleName;
        this.status = http_constants_1.HTTP_STATUS[err.status];
        this.httpStatus = err.status;
        this.date = new Date();
        this.error = err.error;
        this.error = err.errorObject;
    }
}
exports.CustomError = CustomError;
