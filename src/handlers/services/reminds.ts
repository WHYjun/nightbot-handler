import { Request, Response } from "express";
import { Todos } from "../models/todos";

export const sendReminds = async (req: Request, res: Response) => {
  const user = req.query.user ? req.query.user.toString() : "";
  const remindMessage = await writeReminds(user);
  res.status(200).send(remindMessage);
};

const writeReminds = async (user: string) => {
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
    return `${user}님에게 할 일이 없어서 잔소리할 수가 없습니다.`;
  }
  const todo = todoList[Math.floor(Math.random() * length)];
  const message = `@${todo.user} ${todo.todo} 아직도 안 했어?`;
  return message;
};
