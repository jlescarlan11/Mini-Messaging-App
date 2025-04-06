require("dotenv").config();
const { Pool } = require("pg");
("/pleease");
module.exports = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
