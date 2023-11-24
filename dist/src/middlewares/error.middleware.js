"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.asyncErrorHandler = exports.customErrorHandler = void 0;
const customError_1 = require("../utils/customError");
const zod_1 = require("zod");
const logger_1 = require("../config/logger");
const customErrorHandler = (err, req, res, next) => {
    req.logger.error(err);
    if (err instanceof customError_1.CustomError) {
        return res
            .status(err.httpStatus)
            .json({ error: err.message, status: err.status, code: err.httpStatus, object: err.errorObject });
    }
    else {
        return res.status(500).json({ error: 'Internal Server Error', status: 500 });
    }
};
exports.customErrorHandler = customErrorHandler;
// Custom async error handler middleware
const asyncErrorHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
exports.asyncErrorHandler = asyncErrorHandler;
const validate = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params
        });
        return next();
    }
    catch (error) {
        logger_1.logger.error(error);
        if (error instanceof zod_1.ZodError) {
            throw new customError_1.CustomError({
                moduleName: 'validate',
                status: 400,
                message: error.issues[0].message,
                error: error,
                errorObject: error.issues
            });
        }
        else {
            throw new customError_1.CustomError({
                moduleName: 'validate',
                status: 400,
                message: "validation error",
                error: error
            });
        }
    }
});
exports.validate = validate;
