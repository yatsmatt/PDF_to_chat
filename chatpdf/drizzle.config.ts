import { Config } from 'drizzle-kit'; 
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config({ path: ".env" });

// Exporting configuration object
const config: Config = {
  driver: 'pg',
  schema: "./src/lib/db/schema.ts",
  dbCredentials: {
    connectionString: process.env.NANO_CONNECTION!,
  },
};

export default config; 