import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  port: process.env.PORT,
  connation_string: process.env.DATABASE_URL as string,
  jwt_key: process.env.JWTKEY as string,
  jwt_refresh_token: process.env.REFRISH_TOKEN as string,
};

export default config;
