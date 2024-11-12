import { Request, Response } from "express";
import SPromo from "../services/promo.service";
import { formatResponse } from "../utils";
import SArticle from "../services/articles.service";

const CGetAllArticles = async (req: Request, res: Response) => {
  try {
    const articles = await SArticle.findAll();
    res.json(formatResponse(200, "success", articles));
  } catch (error: any) {
    res.status(500).json(formatResponse(500, error.message));
  }
};

const CGetArticleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const article = await SArticle.findById(id);
    if (!article) {
      res.status(404).json(formatResponse(404, "Promo not found"));
      return;
    }
    res.json(formatResponse(200, "success", article));
  } catch (error: any) {
    res.status(500).json(formatResponse(500, error.message));
  }
};

const CCreateArticle = async (req: Request, res: Response) => {
  try {
    const newArticle = await SArticle.create(req.body);
    res.json(formatResponse(201, "success", newArticle));
  } catch (error: any) {
    res.status(500).json(formatResponse(500, error.message));
  }
};

const CUpdateArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedArticle = await SArticle.update(id, req.body);
    if (!updatedArticle) {
      res.status(404).json(formatResponse(404, "Promo not found"));
    }
    res.json(formatResponse(200, "success", updatedArticle));
  } catch (error: any) {
    res.status(500).json(formatResponse(500, error.message));
  }
};

const CDeleteArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedArticle = await SArticle.remove(id);
    if (!deletedArticle) {
      res.status(404).json(formatResponse(404, "Promo not found"));
      return;
    }
    res.json(formatResponse(200, "success", deletedArticle));
  } catch (error: any) {
    res.status(500).json(formatResponse(500, error.message));
  }
};

const CCreateArticleWithTags = async (req: Request, res: Response) => {
  const articleData = req.body;
  try {
    const newArticle = await SArticle.createWithTags(articleData);
    res.json(formatResponse(201, "success", newArticle));
  } catch (error: any) {
    res.status(500).json(formatResponse(500, error.message));
  }
};

export {
  CGetAllArticles,
  CGetArticleById,
  CCreateArticle,
  CUpdateArticle,
  CDeleteArticle,
  CCreateArticleWithTags,
};
