import { Router } from "express";

const router = Router();

router.get("/question-papers", (req, res, next) => res.json({ msg: "question-papers route" }));

export default router;