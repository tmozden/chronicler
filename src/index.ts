import express from "express";
process.env["NODE_CONFIG_DIR"] = "./config";
import config from "config";
import cors from "cors";
import helmet from "helmet";
import createHttpError from "http-errors";
import mongoose from "mongoose";

// Check environment vars
if (!config.get("jwtPrivateKey")) {
  console.log("Fatal Error jwtPrivateKey is not defined.");
}

// App Creation
const app = express();

// Database connection
mongoose
  .connect(config.get("db.host"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECTED TO DATABASE");
  })
  .catch((err) => {
    console.log(err);
    console.log("FAILED TO CONNECT TO DATABASE");
    process.exit(1);
  });

//Use standard web stuff
app.use(helmet);
if (process.env.NODE_ENV == "development") {
  app.use(cors());
}

// Routes




//Error handling
app.use((req, res, next) => {
  next(createHttpError(404));
});

export default app;
