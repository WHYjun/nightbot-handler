import { Sequelize } from "sequelize-typescript";
import { Todos } from "./models/todos";
import dotenv from "dotenv";

dotenv.config();

const DB = process.env.DB;
const USER = process.env.USER;
const HOST = process.env.HOST;
const PASSWORD = process.env.PASSWORD;

const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  ssl: true,
});

sequelize.addModels([Todos]);

export default sequelize;
