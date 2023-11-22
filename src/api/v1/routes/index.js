import { Router } from "express";

import questionpaperRouter from "./questionpaper.routes.js";

const router = Router();

router.use("/", questionpaperRouter);

export default router;