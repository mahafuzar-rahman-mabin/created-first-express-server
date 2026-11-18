import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();
export const userRouter = router;

router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getSingelUser);
router.put("/:id", userController.updateSingleUser);
router.delete("/:id", userController.deleteUser);
