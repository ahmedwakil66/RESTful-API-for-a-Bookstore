import Knex from "knex";
import knexConfig from "./knexfile";
const environment = process.env.NODE_ENV || "development";

const knex = Knex(knexConfig[environment]);

// Retry logic
async function testConnection(retries = 5, delay = 3000) {
  while (retries > 0) {
    try {
      await knex.raw("SELECT 1+1 AS result");
      console.log("Database connection successful");
      return; // Connection successful, exit the loop
    } catch (error: any) {
      console.error(
        `Database connection failed: ${error.message}. Retries left: ${retries}`,
      );
      retries--;
      if (retries === 0) {
        console.error("All retries exhausted. Exiting...");
        process.exit(1);
      }
      await new Promise((resolve) => setTimeout(resolve, delay)); // Wait for a while before retrying
    }
  }
}

// Call the function to test and possibly retry the connection
testConnection();

export default knex;
