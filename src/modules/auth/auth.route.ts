import { Router } from "express";
import { authCenter } from "./auth.controller";

const router = Router();

export const authRouter = router;

router.post("/login", authCenter.createAuth);
router.post("/refresh-token", authCenter.createToken);
