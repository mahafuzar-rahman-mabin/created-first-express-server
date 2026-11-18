import type { Request, Response } from "express";
import { profileServices } from "./profile.service";

const createProfile = async (req: Request, res: Response) => {
  try {
    const result = await profileServices.createProfileIntoDB(req.body);

    // if (result.rowCount === 0) {
    //   res.status(500).json({
    //     success: false,
    //     message: "Profile not fount",
    //     // data: result.rows,
    //   });
    // }
    res.status(200).json({
      success: true,
      message: "Profile add successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
};

export const profileController = {
  createProfile,
};
