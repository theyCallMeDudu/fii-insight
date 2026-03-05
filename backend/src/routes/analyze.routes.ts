import { Router } from "express";
import { analyzeFiiController } from "../controllers/analyzeFii.controller";

export const analyzeRoutes = Router();

analyzeRoutes.post("/analyze", analyzeFiiController);