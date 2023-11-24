"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestDataNew = void 0;
const postgres_config_1 = __importDefault(require("../config/postgres.config"));
function getTestDataNew(year) {
    return (0, postgres_config_1.default) `SELECT * FROM public.brands WHERE year = ${year}`;
}
exports.getTestDataNew = getTestDataNew;
