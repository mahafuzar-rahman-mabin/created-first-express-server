import { Router } from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";
import { RoleAssign } from "../../types";

const router = Router();
export const userRouter = router;

router.post("/", userController.createUser);
router.get(
  "/",
  auth(RoleAssign.admin, RoleAssign.agent),
  userController.getAllUsers,
);
router.get(
  "/:id",
  auth(RoleAssign.admin, RoleAssign.user, RoleAssign.agent),
  userController.getSingelUser,
);
router.put(
  "/:id",
  auth(RoleAssign.admin, RoleAssign.user),
  userController.updateSingleUser,
);
router.delete(
  "/:id",
  auth(RoleAssign.admin, RoleAssign.user),
  userController.deleteUser,
);
