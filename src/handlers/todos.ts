import { parseNightbotUser } from "../common/parser";
import { Request, Response } from "express";

export const postTodos = (req: Request, res: Response) => {
  const user = parseNightbotUser(req.headers["nightbot-user"] as string);
  const { todo } = req.query;
  if (user) {
    res.status(200).send(`${todo} is added to ${user}'s list`);
  } else {
    res.status(404);
  }
};

// export const getTodos = (req, res) => {};
