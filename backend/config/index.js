import dotenv from "dotenv";

const environment = dotenv.config();

if (environment.error) {
  throw new Error("no environment file found");
}

export default {
  port: process.env.PORT,

  target_url: process.env.TARGET_URL,
};
