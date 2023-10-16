import { Router } from "express";
import * as ScraperController from "../controller/scrap.controller.js";
const router = Router();

router.get("/", ScraperController.scrapeTarget);

export default router;
