import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";
import type { Trole } from "../types";

const auth = (...roles: Trole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      //   console.log(req.headers.authorization);
      console.log(roles);
      const token = req.headers.authorization;

      if (!token) {
        res.status(401).json({
          success: false,
          message: "Unauthorized access!!",
        });
      }

      const decode = jwt.verify(
        token as string,
        config.jwt_key as string,
      ) as JwtPayload;
      //   console.log(decode);

      const user = await pool.query(
        `
    SELECT * FROM users WHERE email = $1
    `,
        [decode.email],
      );

      if (user.rowCount === 0) {
        res.status(404).json({
          success: false,
          message: "user not found",
        });
      }

      if (!user.rows[0].is_active) {
        res.status(404).json({
          success: false,
          message: "Forbidden!!",
        });
      }

      if (roles.length && !roles.includes(user.rows[0].role)) {
        res.status(401).json({
          success: false,
          message: "Unauthorized access!!",
        });
      }
      req.user = decode;
      console.log(req.user);
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
