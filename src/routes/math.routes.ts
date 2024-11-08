import { Router } from "express";
import {
  CGetHistory,
  CListOperations,
  CMathOperations,
  CRemoveByIndex,
} from "../controllers/math.controller";

const router = Router();

router.get("/list", CListOperations);
router.get("/:valueA/:operation/:valueB", CMathOperations);
router.post("/", CMathOperations);
router.get("/", CMathOperations);
router.get("/history", CGetHistory);
router.delete("/history/:id", CRemoveByIndex);

export default router;
