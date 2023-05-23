import pool from "../configs/db.js";

const getBook = async (req, res, next) => {
  const { book_id } = req.params;

  try {
    const books = await pool.query("SELECT * FROM books WHERE book_id=$1", [
      book_id,
    ]);

    res.status(200).json(books.rows[0]);
  } catch (error) {
    next(error);
  }
};

const getBooks = async (req, res, next) => {
  try {
    const books = await pool.query("SELECT * FROM books ORDER BY created_at");

    res.status(200).json(books.rows);
  } catch (error) {
    next(error);
  }
};

const addBook = async (req, res, next) => {
  const { user_id } = req.user;
  const { title, author, pages, end_date, notes, review } = req.body;
  const image_url = req?.file?.filename;

  try {
    const newBook = await pool.query(
      "INSERT INTO books(user_id, title,author, pages, end_date,notes, review, image_url) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [user_id, title, author, pages, end_date, notes, review, image_url]
    );

    res.status(201).json(newBook.rows[0]);
  } catch (error) {
    next(error);
  }
};

const editBook = async (req, res, next) => {
  const { book_id } = req.params;
  const { title, author, pages, end_date, notes, review } = req.body;
  const image_url = req?.file?.filename;
  const { user_id } = req.user;

  try {
    const editedBook = await pool.query(
      "UPDATE books SET title=$1, author=$2, pages=$3, end_date=$4, notes=$5, review=$6, image_url=$7, updated_at=NOW() WHERE book_id=$8 AND user_id=$9 RETURNING *",
      [
        title,
        author,
        pages,
        end_date,
        notes,
        review,
        image_url,
        book_id,
        user_id,
      ]
    );

    res.status(200).json(editedBook.rows[0]);
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req, res, next) => {
  const { book_id } = req.params;
  const { user_id } = req.user;

  try {
    await pool.query("DELETE FROM books WHERE book_id=$1 AND user_id=$2", [
      book_id,
      user_id,
    ]);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export { getBook, getBooks, addBook, editBook, deleteBook };
