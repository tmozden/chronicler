import express from "express";
process.env["NODE_CONFIG_DIR"] = "./config";
import config from "config";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";

// Check environment vars 
if (!config.get("jwtPrivateKey")) {
  console.log("Fatal Error jwtPrivateKey is not defined.");
}

// App Creation
const app = express();

// Database connection
mongoose
  .connect(config.get("db.host"), { useNewUrlParser: true })
  .then(() => {
    console.log("CONNECTED TO DATABASE");
  })
  .catch((err) => {
    console.log(err);
    console.log("FAILED TO CONNECT TO DATABASE");
    process.exit(1);
  });


app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(3000, () => {
  console.log("chronicler is listening on port 3000");
});
