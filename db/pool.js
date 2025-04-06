require("dotenv").config();
const { Pool } = require("pg");

// Correct connection string construction
module.exports = new Pool({
  connectionString: `postgresql://${process.env.DB_USER}:${encodeURIComponent(
    process.env.DB_PASSWORD
  )}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
});
