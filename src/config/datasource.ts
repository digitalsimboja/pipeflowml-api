import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../entities/user";

dotenv.config();

let credentials: any = {};
if (process.env.NODE_ENVIRONMENT === "production") {
  credentials = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  };
} else if (process.env.NODE_ENVIRONMENT === "testing") {
  credentials = {
    host: process.env.DB_HOST_TEST,
    port: process.env.DB_PORT_TEST,
    username: process.env.DB_USER_NAME_TEST,
    password: process.env.DB_PASSWORD_TEST,
    database: process.env.DB_NAME_TEST,
  };
} else {
  credentials = {
    host: process.env.DB_HOST_LOCAL,
    port: process.env.DB_PORT_LOCAL,
    username: process.env.DB_USER_NAME_LOCAL,
    password: process.env.DB_PASSWORD_LOCAL,
    database: process.env.DB_NAME_LOCAL,
  };
}

export const AppDataSource = new DataSource({
  type: "postgres",
  host: credentials.host,
  port: parseInt(credentials.port!),
  username: credentials.username,
  password: credentials.password,
  database: credentials.database!,
  synchronize: true,
  logging: true,
  entities: [User],
  subscribers: ["subscriber/*.ts"],
  migrations: ["migration/*.ts"],
});
