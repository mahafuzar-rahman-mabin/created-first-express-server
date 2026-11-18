import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { Iauth } from "./auth.interface";
import jwt from "jsonwebtoken";
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
  };

  const accessToken = jwt.sign(jwdPayload, `${config.jwt_key}`, {
    expiresIn: "1d",
  });

  delete userDetsils.password;
  return { accessToken, data: userDetsils };
};

export const authServices = {
  createAuthIntoApp,
};
