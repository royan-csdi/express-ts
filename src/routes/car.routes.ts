import { Router } from "express";
import {
  CCreateCar,
  CCreateCarWithBlogs,
  CDeleteCar,
  CGetAllCars,
  CGetCarById,
  CUpdateCar,
  CUpdateCarWithTags,
  CSearchByTitle,
} from "../controllers/car.controller";

const router = Router();

router.get("/", CGetAllCars);
router.get("/:id", CGetCarById);
router.post("/", CCreateCar);
router.patch("/:id", CUpdateCar);
router.delete("/:id", CDeleteCar);
router.post("/tags", CCreateCarWithBlogs);
router.patch("/:id/tags", CUpdateCarWithTags);
router.get("/q/:title", CSearchByTitle);

export default router;
