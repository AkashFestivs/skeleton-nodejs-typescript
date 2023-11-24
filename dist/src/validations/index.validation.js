"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    username: zod_1.z.string({
        required_error: "Username is required",
        invalid_type_error: "Username must be a string",
    })
});
