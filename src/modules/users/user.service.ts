import { hash } from "bcrypt-ts";
import { pool } from "../../db";
import type { Iuser, UpUser } from "./user.interface";

const createUserIntoDB = async (payload: Iuser) => {
  //   console.log(req.body);
  const { name, email, password, age } = payload;
  //   console.log(password);

  const hashPass = await hash(password, 10);
  // console.log(hashPass);

  const result = await pool.query(
    `
    INSERT INTO users(name, email, password,age) VALUES
    ($1,$2,$3,$4) RETURNING *
    `,
    [name, email, hashPass, age],
  );
  delete result.rows[0].password;
  return result;
};

const getAllUserIntoDB = async () => {
  const result = await pool.query(`
        SELECT * FROM users;
        `);
  return result;
};

const getSingleUserIntoDB = async (id: string) => {
  const result = await pool.query(
    `
        SELECT * FROM users WHERE id = $1
        `,
    [id],
  );
  return result;
};

const updateSingleUserIntoDB = async (payload: Partial<UpUser>, id: string) => {
  const { name, password, age, is_Active } = payload;

  const result = await pool.query(
    `
    UPDATE users SET
    name = COALESCE($1, name),
    password = COALESCE($2 ,password),
    age = COALESCE($3, age),
    is_Active = COALESCE($4, is_Active),
    updated_at = NOW()
    WHERE id = $5 RETURNING *
      `,
    [name ?? null, password ?? null, age ?? null, is_Active ?? null, id],
  );

  return result;
};

const deleteUserIntoDB = async (id: string) => {
  const result = await pool.query(
    `
        DELETE FROM users
        WHERE id = $1
        `,
    [id],
  );
  return result;
};
export const userService = {
  createUserIntoDB,
  getAllUserIntoDB,
  getSingleUserIntoDB,
  updateSingleUserIntoDB,
  deleteUserIntoDB,
};
