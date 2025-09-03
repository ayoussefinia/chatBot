-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

-- Insert a dummy user with a bcrypt password (matches your earlier one)
INSERT INTO users (email, password)
VALUES (
  'test@example.com',
  '$2a$10$E6mJ9O.Yeje8TokTs6UjKOrX.YbAELdpXfUdj.L.0HfCygsVcLcze'
)
ON CONFLICT (email) DO NOTHING;

-- Messages (todos) table
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert a test todo
INSERT INTO messages (user_id, content, completed)
VALUES (1, 'sleep', false)
ON CONFLICT DO NOTHING;
