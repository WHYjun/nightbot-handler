import cors from "cors";
import express from "express";
import sequelize from "./handlers/sequelize";
import { sayHello } from "./handlers/helloworld";
import {
  getTodos,
  postTodos,
  postKoreanTodos,
  removeOrCompleteKoreanTodos,
  completeTodos,
} from "./handlers/services/todos";
import { getDone } from "./handlers/services/dones";
import { sendReminds } from "./handlers/services/reminds";
import { sendNudges } from "./handlers/services/nudges";

// initialize configuration
// dotenv.config();

// sequelize
async () => {
  await sequelize.sync({ force: true });
};

// define a route handler for the default home page
const app = express();

const allowedOrigins = [process.env.ALLOWED_ORIGINS];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options));
app.use(express.json());

// nightbot urlfetch can send HTTP GET request only :(
app.get("/api/hello", (req, res) => sayHello(req, res));
app.get("/api/todos", (req, res) => postTodos(req, res));
app.get("/api/koreanToDos", (req, res) => postKoreanTodos(req, res));
app.get("/api/todolists", (req, res) => getTodos(req, res));
app.get("/api/koreanCompleteTodos", (req, res) =>
  removeOrCompleteKoreanTodos(req, res, "완료")
);
app.get("/api/completeTodos", (req, res) => completeTodos(req, res));
app.get("/api/koreanRemoveTodos", (req, res) =>
  removeOrCompleteKoreanTodos(req, res, "제거")
);
app.get("/api/dones", (req, res) => getDone(req, res));
app.get("/api/reminds", (req, res) => sendReminds(req, res));
app.get("/api/nudge", (req, res) => sendNudges(req, res));

// start the express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
