import dotenv from "dotenv";
import express from "express";
import { parseNightbotChannel, parseNightbotUser } from "./common/parser";

// initialize configuration
dotenv.config();

// port is now available to the Node.js runtime
// as if it were an environment variable
const port = process.env.PORT || 3000;

// define a route handler for the default home page
const app = express();

app.get("/api/hello", (req, res) => {
  const channel = parseNightbotChannel(
    req.headers["nightbot-channel"] as string
  );
  const user = parseNightbotUser(req.headers["nightbot-user"] as string);
  const message = `Hello! Your username is ${user.displayName} and the current channel is ${channel.displayName}.`;

  res.status(200).send(message);
});

// start the express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
