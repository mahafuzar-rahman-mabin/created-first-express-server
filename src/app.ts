import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import { pool } from "./db";
import { userRouter } from "./modules/users/user.route";
import { profilesRouter } from "./modules/profiles/profile.route";
import { authRouter } from "./modules/auth/auth.route";

export const app: Application = express();

app.use(express.json());
app.use(express.text());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "This is root route",
    author: "ME",
  });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/profiles", profilesRouter);
app.use("/api/v1/auth", authRouter);

// app.use("/api/v1/users/:id", userRouter);
