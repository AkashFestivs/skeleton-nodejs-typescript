"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachChildLogger = exports.requestLogger = exports.addRequestId = void 0;
const logger_1 = require("../config/logger");
const crypto_1 = require("crypto");
const express_winston_1 = __importDefault(require("express-winston"));
const addRequestId = (req, res, next) => {
    req.reqId = (0, crypto_1.randomUUID)();
    next();
};
exports.addRequestId = addRequestId;
exports.requestLogger = express_winston_1.default.logger({
    winstonInstance: logger_1.logger,
    meta: true, // Log metadata such as req.url, req.method, etc.
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: true,
    colorize: true, // Disable colorization if you want plain text logs
    dynamicMeta: (req, res) => {
        return {
            requestId: req.reqId
        };
    }
});
const attachChildLogger = (req, res, next) => {
    req.logger = logger_1.logger.child({ requestId: req.reqId });
    next();
};
exports.attachChildLogger = attachChildLogger;
