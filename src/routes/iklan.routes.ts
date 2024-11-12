import { Router } from "express";
import {
  CCreateIklan,
  CDeleteIklan,
  CGetAllIklans,
  CGetIklanById,
  CUpdateIklan,
} from "../controllers/iklan.controller";

const router = Router();

router.get("/", CGetAllIklans);
router.get("/:id", CGetIklanById);
router.post("/", CCreateIklan);
router.patch("/:id", CUpdateIklan);
router.delete("/:id", CDeleteIklan);

export default router;
