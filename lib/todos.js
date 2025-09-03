const fs = require('fs').promises;
const path = require('path');

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'todos.json');

async function ensureDataFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(DATA_FILE);
  } catch (err) {
    // create empty array file if missing
    await fs.writeFile(DATA_FILE, '[]', 'utf8');
  }
}

async function readTodos() {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, 'utf8');
  return JSON.parse(raw || '[]');
}

async function writeTodos(todos) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(todos, null, 2), 'utf8');
}

module.exports = { readTodos, writeTodos };
