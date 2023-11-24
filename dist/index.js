"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./src/routes/router"));
const logger_middleware_1 = require("./src/middlewares/logger.middleware");
const express_useragent_1 = __importDefault(require("express-useragent"));
const error_middleware_1 = require("./src/middlewares/error.middleware");
const redis_config_1 = require("./src/config/redis.config");
const app = (0, express_1.default)();
const PORT = process.env.PORT;
redis_config_1.redisClient.connect();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_useragent_1.default.express());
// Request logger
app.use(logger_middleware_1.addRequestId);
app.use(logger_middleware_1.requestLogger);
app.use(logger_middleware_1.attachChildLogger);
app.use("/auth", router_1.default);
app.use(error_middleware_1.customErrorHandler);
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
