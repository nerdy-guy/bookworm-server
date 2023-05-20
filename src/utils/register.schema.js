import { z } from "zod";

const registerSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(2, { message: "Name must be between 2 and 64 characters" })
      .max(64, { message: "Name must be between 2 and 64 characters" }),
    email: z
      .string({
        required_error: "email is required",
        invalid_type_error: "email must be a string",
      })
      .email({ message: "Invalid email address" }),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
      })
      .min(8, { message: "Password must be between 8 and 255 characters" })
      .max(255, {
        message: "Password must be between 8 and 255 characters",
      }),
  }),
});

export default registerSchema;
