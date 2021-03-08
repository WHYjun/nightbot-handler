import dotenv from "dotenv";
import express from "express";
import { sayHello } from "./handlers/helloworld";
import { getTodos, postTodos } from "./handlers/todos";

// initialize configuration
dotenv.config();

// port is now available to the Node.js runtime
// as if it were an environment variable
const port = process.env.PORT || 3000;

// define a route handler for the default home page
const app = express();

app.get("/api/hello", (req, res) => sayHello(req, res));
app.get("/api/todos", (req, res) => postTodos(req, res));
app.get("/api/todolists", (req, res) => getTodos(req, res));

// start the express server
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
