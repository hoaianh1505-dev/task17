import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { News } from "../entities/News";
import { config } from "./env";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.db.host,
  port: config.db.port,
  username: config.db.user,
  password: config.db.password,
  database: config.db.name,
  synchronize: true,
  logging: false,
  entities: [User, News],
});

export const initDb = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Connected to PostgreSQL Database via TypeORM");
  } catch (error) {
    console.error("Error connecting to database", error);
  }
};
