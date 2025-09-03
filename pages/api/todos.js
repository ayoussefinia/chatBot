// pages/api/todos.js
import { Client } from "pg";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});
client.connect();

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  // look up user_id from email
  const userRes = await client.query("SELECT id FROM users WHERE email = $1", [
    session.user.email,
  ]);
  const user = userRes.rows[0];
  if (!user) return res.status(401).json({ error: "User not found" });

  if (req.method === "GET") {
    const result = await client.query(
      "SELECT id, content, completed FROM messages WHERE user_id = $1 ORDER BY created_at DESC",
      [user.id]
    );
    return res.json(result.rows);
  }

  if (req.method === "POST") {
    const { title } = req.body;
    const result = await client.query(
      "INSERT INTO messages (user_id, content) VALUES ($1, $2) RETURNING id, content, completed",
      [user.id, title]
    );
    return res.status(201).json(result.rows[0]);
  }

  if (req.method === "PUT") {
    const { id, completed } = req.body;
    const result = await client.query(
      "UPDATE messages SET completed=$1 WHERE id=$2 AND user_id=$3 RETURNING id, content, completed",
      [completed, id, user.id]
    );
    return res.json(result.rows[0]);
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    await client.query("DELETE FROM messages WHERE id=$1 AND user_id=$2", [
      id,
      user.id,
    ]);
    return res.status(204).end();
  }

  return res.status(405).json({ error: "Method not allowed" });
}
