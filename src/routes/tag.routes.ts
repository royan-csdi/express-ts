import { Router } from "express";
import {
  CCreateArticle,
  CDeleteArticle,
  CGetAllArticles,
  CGetArticleById,
  CUpdateArticle,
} from "../controllers/article.controller";
import {
  CCreateTag,
  CDeleteTag,
  CGetAllTags,
  CGetTagById,
  CUpdateTag,
} from "../controllers/tag.controller";

const router = Router();

router.get("/", CGetAllTags);
router.get("/:id", CGetTagById);
router.post("/", CCreateTag);
router.patch("/:id", CUpdateTag);
router.delete("/:id", CDeleteTag);

export default router;
