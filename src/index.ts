import dotenv from "dotenv";
import express from "express";
import sequelize from "./handlers/sequelize";
import { sayHello } from "./handlers/helloworld";
import {
  getTodos,
  postTodos,
  postKoreanTodos,
  removeOrCompleteKoreanTodos,
} from "./handlers/services/todos";
import { getDone } from "./handlers/services/dones";

// initialize configuration
dotenv.config();

// sequelize
async () => {
  await sequelize.sync({ force: true });
};

// define a route handler for the default home page
const app = express();

// nightbot urlfetch can send HTTP GET request only :(
app.get("/api/hello", (req, res) => sayHello(req, res));
app.get("/api/todos", (req, res) => postTodos(req, res));
app.get("/api/koreanToDos", (req, res) => postKoreanTodos(req, res));
app.get("/api/todolists", (req, res) => getTodos(req, res));
app.get("/api/koreanCompleteTodos", (req, res) =>
  removeOrCompleteKoreanTodos(req, res, "완료")
);
app.get("/api/koreanRemoveTodos", (req, res) =>
  removeOrCompleteKoreanTodos(req, res, "제거")
);
app.get("/api/done", (req, res) => getDone(req, res));

// start the express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
