import app from "./app.js";
import { PORT } from "./configs/globalConfigs.js";
import logger from "./utils/logger.js";

app.listen(PORT, () =>
  logger.info(`Server running on http://localhost:${PORT}`)
);
