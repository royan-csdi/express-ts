import { Request, Response } from "express";
import SPromo from "../services/promo.service";
import { formatResponse } from "../utils";

const CGetAllPromos = async (req: Request, res: Response) => {
  try {
    const promos = await SPromo.findAll();
    res.json(formatResponse(200, "success", promos));
  } catch (error: any) {
    res.status(500).json(formatResponse(500, error.message));
  }
};

const CGetPromoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const promo = await SPromo.findById(id);
    if (!promo) {
      res.status(404).json(formatResponse(404, "Promo not found"));
      return;
    }
    res.json(formatResponse(200, "success", promo));
  } catch (error: any) {
    res.status(500).json(formatResponse(500, error.message));
  }
};

const CCreatePromo = async (req: Request, res: Response) => {
  try {
    const newPromo = await SPromo.create(req.body);
    res.json(formatResponse(201, "success", newPromo));
  } catch (error: any) {
    res.status(500).json(formatResponse(500, error.message));
  }
};

const CUpdatePromo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedPromo = await SPromo.update(id, req.body);
    if (!updatedPromo) {
      res.status(404).json(formatResponse(404, "Promo not found"));
    }
    res.json(formatResponse(200, "success", updatedPromo));
  } catch (error: any) {
    res.status(500).json(formatResponse(500, error.message));
  }
};

const CDeletePromo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedPromo = await SPromo.remove(id);
    if (!deletedPromo) {
      res.status(404).json(formatResponse(404, "Promo not found"));
      return;
    }
    res.json(formatResponse(200, "success", deletedPromo));
  } catch (error: any) {
    res.status(500).json(formatResponse(500, error.message));
  }
};

export {
  CGetAllPromos,
  CGetPromoById,
  CCreatePromo,
  CUpdatePromo,
  CDeletePromo,
};
