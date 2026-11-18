import type { Request, Response } from "express";
import { authServices } from "./auth.service";

const createAuth = async (req: Request, res: Response) => {
  try {
    const result = await authServices.createAuthIntoApp(req.body);
    // console.log(result);
    res.status(200).json({
      success: true,
      message: "access key",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
};

export const authCenter = {
  createAuth,
};
