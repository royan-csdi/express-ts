import { Router } from "express";
import {
  CLogin,
  CRefreshToken,
  CRegister,
} from "../controllers/auth.controller";

const router = Router();

router.post("/login", CLogin);
router.post("/register", CRegister);
router.post("/refresh-token", CRefreshToken);

export default router;
