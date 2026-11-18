import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  port: process.env.PORT,
  connation_string: process.env.DATABASE_URL as string,
  jwt_key: process.env.JWTKEY,
};

export default config;
