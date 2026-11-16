import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import { Pool } from "pg";
import config from "./config";
const app: Application = express();
const port = 3000;

const pool = new Pool({
  connectionString: config.connation_string,
});

// console.log(pool);

app.use(express.json());
app.use(express.text());

const initDB = async () => {
  try {
    await pool.query(`

        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        age INT,
        is_Active BOOLEAN DEFAULT true,

        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()

        
        );
         `);
    console.log("Database connected!!");
  } catch (error) {
    console.log(error);
  }
};

initDB();

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "This is root route",
    author: "ME",
  });
});

app.post("/api/v1/users", async (req: Request, res: Response) => {
  try {
    //   console.log(req.body);
    const { name, email, password, age } = req.body;
    //   console.log(password);

    const result = await pool.query(
      `
    INSERT INTO users(name, email, password,age) VALUES
    ($1,$2,$3,$4) RETURNING *
    `,
      [name, email, password, age],
    );

    // console.log(result);
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
});

app.get("/api/v1/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
        SELECT * FROM users;
        `);
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
});

app.get("/api/v1/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `
        SELECT * FROM users WHERE id = $1
        `,
      [id],
    );
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
});

app.put("/api/v1/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, password, age, is_Active } = req.body;

    const result = await pool.query(
      `
    UPDATE users SET
    name = COALESCE($1, name),
    password = COALESCE($2 ,password),
    age = COALESCE($3, age),
    is_Active= COALESCE($4, is_Active),
    updated_at = NOW()
    WHERE id = $5 RETURNING *
      `,
      [name ?? null, password ?? null, age ?? null, is_Active ?? null, id],
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
});

app.delete("/api/v1/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
        DELETE FROM users
        WHERE id = $1
        `,
      [id],
    );
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
});

app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`);
});
