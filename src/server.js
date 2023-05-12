import app from "./app.js";
import { PORT } from "./configs/globalConfigs.js";

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
