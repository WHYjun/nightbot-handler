import { parseNightbotChannel, parseNightbotUser } from "../common/parser";
import { Request, Response } from "express";

export const sayHello = (req: Request, res: Response) => {
  const channel = parseNightbotChannel(
    req.headers["nightbot-channel"] as string
  );
  const user = parseNightbotUser(req.headers["nightbot-user"] as string);
  const message = `Hello! Your username is ${user.displayName} and the current channel is ${channel.displayName}.`;

  res.status(200).send(message);
};
