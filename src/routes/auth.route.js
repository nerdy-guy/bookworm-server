import { Router } from "express";
import {
  getUser,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";
import validate from "../middlewares/schemaValidator.js";
import registerSchema from "../utils/register.schema.js";
import loginSchema from "../utils/login.schema.js";

const router = Router();

router
  .post("/register", validate(registerSchema), register)

  .post("/login", validate(loginSchema), login)

  .post("/logout", logout)

  .get("/", getUser);

export default router;
