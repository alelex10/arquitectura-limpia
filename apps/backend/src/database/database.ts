// apps/backend/src/config/database.ts

import dotenv from "dotenv";
dotenv.config();
import path from "path";
import { Sequelize } from "sequelize-typescript";
import { UserModel } from "./models/User.model";
import { DocumentVersionModel } from "./models/DocumentVersion.model";
import { SessionModel } from "./models/Session.model";
import { DocumentModel } from "./models/Document.model";

console.log("process.env", process.env.DB_PASS);
const {
	DB_HOST,
	DB_PORT,
	DB_USER, 
	DB_PASS,  
	DB_NAME,  
} = process.env;

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  models: [UserModel, DocumentVersionModel, SessionModel, DocumentModel], // buscará modelos en src/models
  logging: false
});

export default sequelize;
