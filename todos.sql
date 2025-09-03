-- Active: 1756711041456@@172.19.0.3@5432@tododb
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);
INSERT INTO users (email, password) VALUES ('test@example.com', '$2a$10$E6mJ9O.Yeje8TokTs6UjKOrX.YbAELdpXfUdj.L.0HfCygsVcLcze');

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO messages (user_id, content) VALUES ('1', 'sleep');
