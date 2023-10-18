import express from "express";
import config from "../config/index.js";
import scraper from "./api/routes/scraper.js";
import * as middlewares from "../middlewares.js";

async function startServer() {
  const app = express();

  app
    .listen(config.port, () => {
      console.log(`
        ################################################
        🛡️  Server listening on port: ${config.port} 🛡️
        ################################################
      `);
    })
    .on("error", (err) => {
      console.error(err);
      process.exit(1);
    });
  app.get("/", (req, res) => {
    res
      .status(200)
      .send(
        "Greetings! Welcome to our REST API designed to extract data from a specified URL and provide it to you in JSON format. To begin, we recommend referring to our documentation."
      );
  });
  app.use("/scraper", scraper);
  app.use(middlewares.queryCannotBeEmpty);
  app.use(middlewares.queryHasUnsupportCriteria);
  app.use(middlewares.isUnsupportedTargetURL);
  app.use(middlewares.isNavigationError);
}
startServer();
