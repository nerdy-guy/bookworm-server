import { z } from "zod";

const loginSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
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

export default loginSchema;
