"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_controller_1 = require("../controller/index.controller");
const error_middleware_1 = require("../middlewares/error.middleware");
const index_validation_1 = require("../validations/index.validation");
const router = (0, express_1.Router)();
router.get('/test', (0, error_middleware_1.asyncErrorHandler)((0, error_middleware_1.validate)(index_validation_1.registerSchema)), (0, error_middleware_1.asyncErrorHandler)(index_controller_1.test));
exports.default = router;
