import { Request, Response } from "express";
import { formatResponse } from "../utils";
import SIklan from "../services/iklan/iklan.service";
const CGetAllIklans = async (req: Request, res: Response) => {
  try {
    const iklans = await SIklan.findAll();
    res.json(formatResponse(200, "Success", iklans));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to retrieve iklans" });
  }
};

const CGetIklanById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const iklans = await SIklan.findById(id);
    if (!iklans) {
      res.status(404).json({ error: "Promo not found" });
      return;
    }
    res.json(formatResponse(200, "Success", iklans));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to retrieve iklans" });
    return;
  }
};

const CCreateIklan = async (req: Request, res: Response) => {
  try {
    const newIklan = await SIklan.create(req.body);
    res.json(formatResponse(201, "Success", newIklan));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to create promo" });
  }
};

const CUpdateIklan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedIklan = await SIklan.update(id, req.body);
    if (!updatedIklan) {
      res.status(404).json({ error: "Promo not found" });
      return;
    }
    res.json(formatResponse(200, "Success", updatedIklan));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to update promo" });
  }
};

const CDeleteIklan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedIklan = await SIklan.remove(id);
    if (!deletedIklan) {
      res.status(404).json({ error: "Promo not found" });
      return;
    }
    res.json(formatResponse(200, "Success", deletedIklan));
  } catch (error: any) {
    res.status(500).json({ error: "Failed to delete promo" });
  }
};

export {
  CGetAllIklans,
  CGetIklanById,
  CCreateIklan,
  CUpdateIklan,
  CDeleteIklan,
};
