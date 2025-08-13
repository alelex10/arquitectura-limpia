// apps/backend/src/app.ts
import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// health
app.get("/health", (req, res) => res.json({ ok: true }));

// placeholder routes
app.use("/api", (req, res) =>
  res.status(404).json({ message: "API routes not implemented yet" })
);

export default app;
