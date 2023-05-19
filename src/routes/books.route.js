import { Router } from "express";
import {
  addBook,
  deleteBook,
  editBook,
  getBook,
  getBooks,
} from "../controllers/books.controller.js";
import upload from "../middlewares/multer.js";
import validate from "../middlewares/schemaValidator.js";
import bookSchema from "../utils/book.schema.js";

const router = Router();

router
  .post("/", upload.single("image_url"), validate(bookSchema), addBook)

  .get("/", getBooks)

  .get("/:book_id", getBook)

  .put("/:book_id", upload.single("image_url"), validate(bookSchema), editBook)

  .delete("/:book_id", deleteBook);

export default router;
