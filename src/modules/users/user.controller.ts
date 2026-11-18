import type { Request, Response } from "express";
import { pool } from "../../db";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUserIntoDB(req.body);
    console.log(result);
    if (result.rowCount === 0) {
      res.status(500).json({
        success: false,
        message: "user not fount",
      });
    }
    res.status(201).json({
      success: true,
      message: "user created",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUserIntoDB();

    if (result.rowCount === 0) {
      res.status(500).json({
        success: false,
        message: "user not fount",
      });
    }
    // console.log(result);
    res.status(200).json({
      success: true,
      message: "All users retrive",
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

const getSingelUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userService.getSingleUserIntoDB(id as string);

    if (result.rowCount === 0) {
      res.status(500).json({
        success: false,
        message: "user not fount",
      });
    }
    // console.log(result);
    res.status(200).json({
      success: true,
      message: "this user retrive",
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

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userService.updateSingleUserIntoDB(
      req.body,
      id as string,
    );
    if (result.rowCount === 0) {
      res.status(500).json({
        success: false,
        message: "user not fount",
      });
    }
    res.status(200).json({
      success: true,
      message: "user updated successfully",
      data: result.rows,
    });
    console.log(result);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await userService.deleteUserIntoDB(id as string);
    if (result.rowCount === 0) {
      res.status(500).json({
        success: false,
        message: "user not fount",
      });
    }
    res.status(200).json({
      success: true,
      message: "user deleted successfully",
      //   data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getSingelUser,
  updateSingleUser,
  deleteUser,
};
