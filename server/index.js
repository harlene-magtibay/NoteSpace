import express from "express";
import cors from "cors";
import env from "dotenv";
import pg from "pg";

env.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

// GET all notes
app.get("/notes", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM notes ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error while fetching notes");
  }
});

// POST a new note
app.post("/notes", async (req, res) => {
  try {
    const { title, content } = req.body;
    const result = await db.query(
      "INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *",
      [title, content]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error while inserting note");
  }
});

// DELETE a note
app.delete("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM notes WHERE id = $1", [id]);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error while deleting note");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

