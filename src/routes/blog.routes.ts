import { Router } from "express";
import {
  CCreateBlog,
  CDeleteBlog,
  CGetAllBlogs,
  CGetBlogById,
  CUpdateBlog,
} from "../controllers/blog.controller";

const router = Router();

router.get("/", CGetAllBlogs);
router.get("/:id", CGetBlogById);
router.post("/", CCreateBlog);
router.patch("/:id", CUpdateBlog);
router.delete("/:id", CDeleteBlog);

export default router;
