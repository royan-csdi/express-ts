import { Request, Response } from "express";
import SPromo from "../services/promo.service";
import { formatResponse } from "../utils";
import SArticle from "../services/articles.service";
import STag from "../services/tag.service";

const CGetAllTags = async (req: Request, res: Response) => {
  try {
    const tags = await STag.findAll();
    res.json(formatResponse(200, "success", tags));
  } catch (error: any) {
    res.status(500).json(formatResponse(500, error.message));
  }
};

const CGetTagById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tag = await STag.findById(id);
    if (!tag) {
      res.status(404).json(formatResponse(404, "Promo not found"));
      return;
    }
    res.json(formatResponse(200, "success", tag));
  } catch (error: any) {
    res.status(500).json(formatResponse(500, error.message));
  }
};

const CCreateTag = async (req: Request, res: Response) => {
  try {
    const newTag = await STag.create(req.body);
    res.json(formatResponse(201, "success", newTag));
  } catch (error: any) {
    res.status(500).json(formatResponse(500, error.message));
  }
};

const CUpdateTag = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedTag = await STag.update(id, req.body);
    if (!updatedTag) {
      res.status(404).json(formatResponse(404, "Promo not found"));
    }
    res.json(formatResponse(200, "success", updatedTag));
  } catch (error: any) {
    res.status(500).json(formatResponse(500, error.message));
  }
};

const CDeleteTag = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTag = await STag.remove(id);
    if (!deletedTag) {
      res.status(404).json(formatResponse(404, "Promo not found"));
      return;
    }
    res.json(formatResponse(200, "success", deletedTag));
  } catch (error: any) {
    res.status(500).json(formatResponse(500, error.message));
  }
};

export { CGetAllTags, CGetTagById, CCreateTag, CUpdateTag, CDeleteTag };
