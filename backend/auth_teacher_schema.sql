CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  name VARCHAR NOT NULL,
  role VARCHAR CHECK (role IN ('student', 'teacher')) DEFAULT 'student',
  total_xp INT DEFAULT 0,
  current_level INT DEFAULT 1,
  streak_count INT DEFAULT 0,
  coins INT DEFAULT 100,
  last_login DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE custom_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID REFERENCES users(id),
  category VARCHAR NOT NULL,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct VARCHAR(1) NOT NULL,
  explanation TEXT DEFAULT '',
  created_at TIMESTAMP DEFAULT NOW()
);