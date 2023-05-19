import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../configs/db.js";
import { JWT_SECRET } from "../configs/globalConfigs.js";
import createHttpError from "http-errors";

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    // check if the user exists
    const existingUser = await pool.query(
      "SELECT email from users WHERE email=$1",
      [email]
    );

    if (existingUser.rowCount) {
      throw createHttpError(409, "User already exists");
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = await pool.query(
      "INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );

    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // look for user in the database
    const user = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    if (!user.rows[0]) {
      throw createHttpError(401, "Invalid email or password");
    }

    // compare passwords
    const comparePasswords = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!comparePasswords) {
      throw createHttpError(401, "Invalid email or password");
    }

    // update last login
    await pool.query("UPDATE users SET last_login=NOW() WHERE email=$1", [
      email,
    ]);

    // create a jwt token
    const token = jwt.sign({ user_id: user.rows[0].user_id }, JWT_SECRET);

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(user.rows[0]);
  } catch (error) {
    next(error);
  }
};

const logout = (req, res, next) => {
  try {
    res
      .clearCookie("accessToken", {
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json("Successfully logged out");
  } catch (error) {
    next(error);
  }
};

export { register, login, logout };
