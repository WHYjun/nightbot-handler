import { parseNightbotUser } from "../common/parser";
import { Request, Response } from "express";

export const postTodos = (req: Request, res: Response) => {
  const user = parseNightbotUser(req.headers["nightbot-user"] as string);
  const { todo } = req.query;
  if (user) {
    res.status(200).send(`${todo} is added to ${user.displayName}'s list`);
  } else {
    res.status(404);
  }
};

export const getTodos = (req: Request, res: Response) => {
  const user = parseNightbotUser(req.headers["nightbot-user"] as string);
  if (user) {
    res
      .status(200)
      .send(`${user.displayName}'s To Do Lists:\n 1. This is Testing`);
  } else {
    res.status(404);
  }
};
