import { Request, Response } from "express";
import { Todos } from "../models/todos";

export const sendNudges = async (req: Request, res: Response) => {
  const user = req.query.user ? req.query.user.toString() : "";
  const remindMessage = await writeNudge(user);
  res.status(200).send(remindMessage);
};

const writeNudge = async (user: string) => {
  let todoList: Array<Todos>;
  if (user) {
    todoList = await Todos.findAll({
      where: { user },
    });
  } else {
    todoList = await Todos.findAll();
  }

  const length = todoList.length;
  if (length === 0) {
    return `${user} doesn't have any items to work on`;
  }
  const todo = todoList[Math.floor(Math.random() * length)];
  const message = `@${todo.user}, did you finish ${todo.todo}?`;
  return message;
};
