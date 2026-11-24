import { app } from "./src/app";
import { env } from "./src/config/env";
import { connectDB } from "./src/config/database";

const port = env.port;

const startServer = async (): Promise<void> => {
  await connectDB();

  app.listen(port, (error?: Error) => {
    if (error) {
      console.error("Error starting server:", error.message);
    } else {
      console.log(`Server running on port ${port}`);
    }
  });
};

startServer();