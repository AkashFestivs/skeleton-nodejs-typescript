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
exports.test = void 0;
const index_model_1 = require("../model/index.model");
const customError_1 = require("../utils/customError");
const http_constants_1 = require("../constants/http.constants");
const response_middleware_1 = require("../middlewares/response.middleware");
function test(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, index_model_1.getTestDataNew)(2018);
        req.logger.info(data);
        if (data.length === 0) {
            throw new customError_1.CustomError({
                moduleName: 'test2',
                status: http_constants_1.HTTP_STATUS.NOT_FOUND,
                message: 'Not Found With id 1',
                error: 'error'
            });
        }
        return (0, response_middleware_1.customResponseHandler)(res, {
            status: http_constants_1.HTTP_STATUS.OK,
            json: data
        });
    });
}
exports.test = test;
