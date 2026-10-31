import { Router } from "express";
import {
  create,
  listNews,
  remove,
  showNews,
  update,
} from "../controllers/news.controller";
import { verifyAuth } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", listNews);
router.get("/:id", showNews);
router.post("/", verifyAuth, create);
router.put("/:id", verifyAuth, update);
router.delete("/:id", verifyAuth, remove);

export default router;
