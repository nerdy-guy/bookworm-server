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
    const books = await pool.query("SELECT * FROM books");

    res.status(200).json(books.rows);
  } catch (error) {
    next(error);
  }
};

const addBook = async (req, res, next) => {
  const { user_id } = req.user;
  const { title, author, pages, start_date, end_date, notes, review } =
    req.body;
  const image_url = req?.file?.filename;

  try {
    // if (!title || !author) {
    //   throw createHttpError(400, "required parametrs");
    // }

    const newBook = await pool.query(
      "INSERT INTO books(user_id, title,author, pages, start_date, end_date,notes, review, image_url) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        user_id,
        title,
        author,
        pages,
        start_date,
        end_date,
        notes,
        review,
        image_url,
      ]
    );

    res.status(201).json(newBook.rows[0]);
  } catch (error) {
    next(error);
  }
};

const editBook = async (req, res, next) => {
  const { book_id } = req.params;
  const {
    title,
    author,
    pages,
    start_date,
    end_date,
    notes,
    review,
    image_url,
  } = req.body;
  const user_id = req.user.user_id;

  try {
    const editedBook = await pool.query(
      "UPDATE books SET title=$1, author=$2, pages=$3, start_date=$4, end_date=$5, notes=$6, review=$7, image_url=$8, updated_at=NOW() WHERE book_id=$9 AND user_id=$10 RETURNING *",
      [
        title,
        author,
        pages,
        start_date,
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
