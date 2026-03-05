import express from "express";
import cors from "cors";
import { analyzeRoutes } from "./routes/analyze.routes";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json({ limit: "1mb" }));

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api", analyzeRoutes);

  return app;
}
