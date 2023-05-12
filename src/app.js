import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import healthcheckRoute from "./routes/healthcheck.route.js";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/healthcheck", healthcheckRoute);

export default app;
