import { Router } from "express";
import healthcheck from "../controllers/healthcheck.controller.js";

const router = Router();

// TODO: add authorization middleware
router.get("/", healthcheck);

export default router;
