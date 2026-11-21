import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import { userRouter } from "./modules/users/user.route";
import { profilesRouter } from "./modules/profiles/profile.route";
import { authRouter } from "./modules/auth/auth.route";
import logger from "./middleware/logger";
import globalErrorHandelar from "./middleware/globalErrorHandler";
import cors from "cors";
import cookieParser from "cookie-parser";

export const app: Application = express();

const corsOptions = {
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(logger);

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

// Global Error Handling Middleware
app.use(globalErrorHandelar);
