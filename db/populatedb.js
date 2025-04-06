const { Client } = require("pg");
require("dotenv").config();

const SQL = `CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    message TEXT,
    alias VARCHAR (15),
    added TIMESTAMP WITH TIME ZONE
);`;

async function main() {
  console.log("seeding...");

  // Use the first command-line argument as the connection string if provided;
  // otherwise, fall back to process.env.DATABASE_URL.
  const connectionString = process.argv[2] || process.env.DATABASE_URL;

  if (!connectionString) {
    console.error("ERROR: No connection string provided.");
    process.exit(1);
  }

  const client = new Client({ connectionString });
  await client.connect();
  await client.query(SQL);
  await client.end();

  console.log("done");
}

main();
