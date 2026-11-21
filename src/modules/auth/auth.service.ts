import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { Iauth } from "./auth.interface";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../../config/index";

const createAuthIntoApp = async (payload: Iauth) => {
  const { email, password } = payload;
  //   console.log(object);
  const user = await pool.query(
    `
            SELECT * FROM users WHERE email = $1
            `,
    [email],
  );

  if (user.rowCount === 0) {
    throw new Error("This user is cradiantial");
  }

  const massPass = await bcrypt.compare(password, user.rows[0].password);

  if (!massPass) {
    throw new Error("passowrd not mach");
  }

  if (!user.rows[0].is_active) {
    throw new Error("user blocked");
  }

  let userDetsils = user.rows[0];
  const jwdPayload = {
    id: userDetsils.id,
    name: userDetsils.name,
    email: userDetsils.email,
    role: userDetsils.role,
  };

  const accessToken = jwt.sign(jwdPayload, config.jwt_key as string, {
    expiresIn: "1d",
  });

  const refreshToken = jwt.sign(
    jwdPayload,
    config.jwt_refresh_token as string,
    {
      expiresIn: "10h",
    },
  );

  delete userDetsils.password;
  return { accessToken, refreshToken, data: userDetsils };
};

const createRefrishToken = async (token: any) => {
  // console.log("Token:", token);
  // console.log("Token Type:", typeof token);
  if (!token) {
    throw new Error("Unauthorized access!!");
  }
  const decode = jwt.verify(
    token as string,
    config.jwt_refresh_token as string,
  ) as JwtPayload;
  // // console.log(decode);
  const user = await pool.query(
    `
    SELECT * FROM users WHERE email = $1
    `,
    [decode.email],
  );
  if (user.rowCount === 0) {
    throw new Error("user not found");
  }
  if (!user.rows[0].is_active) {
    throw new Error("Forbidden!!");
  }
  let userDetsils = user.rows[0];
  const jwdPayload = {
    id: userDetsils.id,
    name: userDetsils.name,
    email: userDetsils.email,
    role: userDetsils.role,
  };
  const accessToken = jwt.sign(jwdPayload, config.jwt_key as string, {
    expiresIn: "1d",
  });
  return accessToken;
};

export const authServices = {
  createAuthIntoApp,
  createRefrishToken,
};
