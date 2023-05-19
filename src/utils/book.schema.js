import { z } from "zod";

const bookSchema = z.object({
  body: z.object({
    title: z.string().nonempty({ message: "Title is required" }),
    author: z.string().nonempty({ message: "Author is required" }),
  }),
});

export default bookSchema;
