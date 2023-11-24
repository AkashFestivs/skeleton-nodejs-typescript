import { z } from "zod";

export const registerSchema = z.object({
    username: z.string({
     required_error: "Username is required",
     invalid_type_error: "Username must be a string",
    })
});