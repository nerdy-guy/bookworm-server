import { z } from "zod";

const bookSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Title is required",
        invalid_type_error: "Title must be a string",
      })
      .nonempty(),
    author: z
      .string({
        required_error: "Author is required",
        invalid_type_error: "Author must be a string",
      })
      .nonempty(),
  }),
});

export default bookSchema;
