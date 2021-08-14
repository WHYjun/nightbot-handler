import { Op } from "sequelize";
import { Dones } from "../models/dones";
import { Request, Response } from "express";

export const getDone = async (req: Request, res: Response) => {
  const today = new Date();
  const doneList = await Dones.findAll({
    where: {
      createdAt: {
        [Op.gt]: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 7
        ),
      },
    },
  });

  if (doneList.length > 0) {
    res.status(200).send(doneList);
  } else {
    res.status(404).send("Nothing is done.");
  }
};
