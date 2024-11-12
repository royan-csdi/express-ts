import { Request, Response } from "express";
import { formatResponse } from "../utils";
import SBlog from "../services/blog/blog.service";
const CGetAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await SBlog.findAll();
    res.json(formatResponse(200, "Success", blogs));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to retrieve blogs" });
  }
};

const CGetBlogById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const blog = await SBlog.findById(id);
    if (!blog) {
      res.status(404).json({ error: "Article not found" });
      return;
    }
    res.json(formatResponse(200, "Success", blog));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to retrieve blog" });
  }
};

const CCreateBlog = async (req: Request, res: Response) => {
  try {
    const newBlog = await SBlog.create(req.body);
    res.json(formatResponse(201, "Success", newBlog));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to create tag" });
  }
};

const CUpdateBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedBlog = await SBlog.update(id, req.body);
    if (!updatedBlog) {
      res.status(404).json({ error: "Tag not found" });
      return;
    }
    res.json(formatResponse(200, "Success", updatedBlog));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to update tag" });
  }
};

const CDeleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedBlog = await SBlog.remove(id);
    if (!deletedBlog) {
      res.status(404).json({ error: "Tag not found" });
      return;
    }
    res.json(formatResponse(200, "Success", deletedBlog));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to delete tag" });
  }
};

export { CGetAllBlogs, CGetBlogById, CCreateBlog, CUpdateBlog, CDeleteBlog };
