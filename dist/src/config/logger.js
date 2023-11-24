"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
// Define log levels and colors
const logLevels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
};
const logColors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'blue'
};
// Create a Winston logger
const logger = winston_1.default.createLogger({
    levels: logLevels,
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }), winston_1.default.format.json()),
    transports: [
        new winston_1.default.transports.Console({
            format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple())
        }),
        new winston_1.default.transports.File({
            level: 'error',
            filename: process.env.LOG_DIR + 'error.log',
            maxsize: 5 * 1024 * 1024, // 5MB
            maxFiles: 5
        }),
        new winston_1.default.transports.File({
            level: 'info',
            filename: process.env.LOG_DIR + 'info.log',
            maxsize: 5 * 1024 * 1024, // 5MB
            maxFiles: 5
        })
    ]
});
exports.logger = logger;
// Add colors to the logger
winston_1.default.addColors(logColors);
