const pool = require("./pool");

async function addMessage({ message, alias, added }) {
  const { rows } = await pool.query(
    `INSERT INTO messages (message, alias, added)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [message, alias, added]
  );
  return rows[0];
}

async function getMessages() {
  const { rows } = await pool.query(
    "SELECT * FROM messages ORDER BY added DESC"
  );
  return rows;
}

async function getMessage(id) {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [
    id,
  ]);
  return rows[0] || null;
}

async function updateMessage(id, { message, alias, added }) {
  const { rows } = await pool.query(
    `UPDATE messages
     SET message = $1, alias = $2, added = $3
     WHERE id = $4
     RETURNING *`,
    [message, alias, added, id]
  );
  return rows[0] || null;
}

async function deleteMessage(id) {
  const { rows } = await pool.query(
    `DELETE FROM messages
     WHERE id = $1
     RETURNING *`,
    [id]
  );
  return rows[0] || null;
}

module.exports = {
  addMessage,
  getMessages,
  getMessage,
  updateMessage,
  deleteMessage,
};
