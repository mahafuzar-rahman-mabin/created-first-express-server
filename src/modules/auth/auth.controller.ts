import type { Request, Response } from "express";
import { authServices } from "./auth.service";
import { sendResponsed } from "../../utils/sendResponsed";

const createAuth = async (req: Request, res: Response) => {
  try {
    const result = await authServices.createAuthIntoApp(req.body);

    const { refreshToken } = result;

    res.cookie("refreshToken", refreshToken, {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      domain: "localhost",
    });
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

const createToken = async (req: Request, res: Response) => {
  try {
    const result = await authServices.createRefrishToken(
      req.cookies.refreshToken,
    );

    // console.log();

    sendResponsed(res, {
      statusCode: 200,
      success: true,
      message: "access token genarated successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponsed(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const authCenter = {
  createAuth,
  createToken,
};
