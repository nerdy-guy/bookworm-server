import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import validate from "../middlewares/schemaValidator.js";
import registerSchema from "../utils/register.schema.js";
import loginSchema from "../utils/login.schema.js";

const router = Router();

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

router.post("/logout", logout);

export default router;