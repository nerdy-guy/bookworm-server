import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import healthcheckRoute from "./routes/healthcheck.route.js";
import authRoute from "./routes/auth.route.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api/healthcheck", healthcheckRoute);

app.use("/api/auth", authRoute);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
