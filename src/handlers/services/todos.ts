import { parseNightbotUser } from "../parser";
import { Request, Response } from "express";
import { Todos } from "../models/todos";
import { Dones } from "../models/dones";

export const postTodos = async (req: Request, res: Response) => {
  try {
    const user = parseNightbotUser(req.headers["nightbot-user"] as string);
    if (user) {
      const todoModel = {
        user: user.displayName,
        todo: req.query.todo.toString(),
      };

      const todoList = await Todos.findAll({
        where: { user: user.displayName },
      });

      if (todoList.length < 5) {
        const todo = await Todos.create(todoModel as any);
        if (todo) {
          res
            .status(200)
            .send(`${todo.todo} is added to ${user.displayName}'s list`);
        }
      } else {
        res
          .status(200)
          .send(
            `You've gone over the limit for today. Please remove or complete any to-do from your list.`
          );
      }
    }
  } catch (e) {
    console.log(e);
    res.status(501).send(e.message);
  }
};

export const postKoreanTodos = async (req: Request, res: Response) => {
  try {
    const user = parseNightbotUser(req.headers["nightbot-user"] as string);
    if (user) {
      const todoModel = {
        user: user.displayName,
        todo: req.query.todo.toString(),
      };

      const todoList = await Todos.findAll({
        where: { user: user.displayName },
      });

      if (todoList.length < 5) {
        const todo = await Todos.create(todoModel as any);
        if (todo) {
          res
            .status(200)
            .send(`${user.displayName}님이 ${todo.todo} 투두리스트에 추가`);
        }
      } else {
        res
          .status(200)
          .send(`할 일 한도 초과! 예전에 넣은 할 일을 제거 혹은 완료해주세요`);
      }
    }
  } catch (e) {
    console.log(e);
    res.status(501).send(e.message);
  }
};

export const getTodos = async (req: Request, res: Response) => {
  const user = parseNightbotUser(req.headers["nightbot-user"] as string);

  if (user) {
    let message = `${user.displayName}'s To Do Lists:`;

    const todoList = await Todos.findAll({
      where: { user: user.displayName },
    });

    let index = 0;
    todoList.map((todo) => {
      index++;
      message = message + ` ${index}. ${todo.todo}`;
    });

    if (user) {
      res.status(200).send(message);
    } else {
      res.status(404);
    }
  }
};

export const removeOrCompleteKoreanTodos = async (
  req: Request,
  res: Response,
  verb: string
) => {
  const user = parseNightbotUser(req.headers["nightbot-user"] as string);
  if (user) {
    const index = req.query.index as string;
    const indexNumber = parseInt(index);
    if (!indexNumber) {
      res.status(200).send(`${verb}할 할 일의 숫자를 입력해주세요.`);
    } else if (indexNumber > 5 || indexNumber < 0) {
      res.status(200).send("0보다 크고 6보다 작은 정수를 입력해주세요.");
    } else if (!Number.isInteger(indexNumber)) {
      res.status(200).send("정수를 입력해주세요.");
    }

    const todoList = await Todos.findAll({
      where: { user: user.displayName },
    });

    if (todoList.length == 0) {
      res.status(200).send(`${verb}할 할 일이 없습니다.`);
    } else {
      const todo = todoList[indexNumber - 1];
      const doneModel = {
        user: todo.user,
        todo: todo.todo,
      };
      await Dones.create(doneModel as any).catch((err) => console.log(err));
      await Todos.destroy({
        where: {
          todoId: todo.todoId,
        },
      });
      res
        .status(200)
        .send(`${user.displayName}님이 ${todo.todo} ${verb}했습니다.`);
    }
  }
};
