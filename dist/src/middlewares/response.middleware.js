"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customResponseHandler = void 0;
const customResponseHandler = (res, options) => {
    const { status = 200, json } = options;
    return res.status(status).json(json);
};
exports.customResponseHandler = customResponseHandler;
