-- Run this entire script in Supabase: SQL Editor → New query → Run
-- Project: https://supabase.com/dashboard → your EduPlay project

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Auth + gamification (matches backend/routes/auth.js)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  username TEXT UNIQUE,
  role TEXT CHECK (role IN ('student', 'teacher')) DEFAULT 'student',
  total_xp INT DEFAULT 0,
  current_level INT DEFAULT 1,
  streak_count INT DEFAULT 0,
  coins INT DEFAULT 100,
  last_login DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.custom_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct TEXT NOT NULL,
  explanation TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic TEXT NOT NULL,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct TEXT NOT NULL,
  explanation TEXT DEFAULT ''
);

CREATE TABLE IF NOT EXISTS public.badges (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  image_url TEXT,
  requirement_type TEXT NOT NULL,
  requirement_value INT NOT NULL
);

CREATE TABLE IF NOT EXISTS public.user_badges (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  badge_id INT REFERENCES public.badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

CREATE TABLE IF NOT EXISTS public.inventory (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL,
  quantity INT DEFAULT 0,
  UNIQUE(user_id, item_name)
);

CREATE TABLE IF NOT EXISTS public.assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic TEXT NOT NULL,
  difficulty TEXT,
  teacher_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  class_name TEXT DEFAULT 'Class Assignment',
  active BOOLEAN DEFAULT true,
  deployed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tell PostgREST to refresh table list (fixes "schema cache" errors after new tables)
NOTIFY pgrst, 'reload schema';
