import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { analyzeRoutes } from "./routes/analyze.routes";

export function createApp() {
  const app = express();

  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      error: "RATE_LIMIT_EXCEEDED",
      message: "Muitas requisições. Tente novamente mais tarde.",
    },
  });

  app.use(cors());
  app.use(express.json({ limit: "1mb" }));
  app.set("json spaces", 2);

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api", apiLimiter, analyzeRoutes);

  return app;
}