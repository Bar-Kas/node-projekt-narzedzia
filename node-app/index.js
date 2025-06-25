const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Serwowanie plików statycznych (frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Root → public/index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Helper: połączenie z bazą
async function getConnection() {
  return mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  });
}

// GET /users — pobierz wszystkich użytkowników
app.get('/users', async (req, res) => {
  const conn = await getConnection();
  const [rows] = await conn.execute('SELECT id, name, email FROM users');
  await conn.end();
  res.json(rows);
});

// POST /users — dodaj nowego użytkownika
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Brakuje name lub email' });
  }
  const conn = await getConnection();
  try {
    const [result] = await conn.execute(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    await conn.end();
    res.status(201).json({ id: result.insertId, name, email });
  } catch (err) {
    await conn.end();
    res.status(500).json({ error: err.message });
  }
});

// DELETE /users/:id — usuń użytkownika o zadanym ID
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  const conn = await getConnection();
  const [result] = await conn.execute('DELETE FROM users WHERE id = ?', [id]);
  await conn.end();
  if (result.affectedRows === 0) {
    return res.status(404).json({ error: 'Nie znaleziono użytkownika' });
  }
  res.json({ deletedId: id });
});

// Uruchomienie serwera na wszystkich interfejsach
app.listen(port, '0.0.0.0', () => {
  console.log(`Aplikacja działa na porcie ${port}`);
});

