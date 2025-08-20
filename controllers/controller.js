import { Pool } from "pg";

const pool = new Pool({
  host: "postgres",
  database: "cadastro-pessoas",
  user: "admin",
  password: "admin",
  port: 5432,
});

async function query(text, params) {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res;
  } finally {
    client.release();
  }
}

export async function getAllDados(req, res) {
    try {
      const result = await query("SELECT * FROM pessoas");
      res.json(result.rows);
    } catch(err) {
      console.error(err);    
    }
}

export async function deletePessoa(req, res) {
    try {
      const { id } = req.params;
      const result = await query(`DELETE FROM pessoas WHERE id = ${id}`);
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "fantasma" });
      }
      res.json({ success: true });
    } catch(err) {
      console.error(err);    
    }
}