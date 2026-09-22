CREATE TABLE IF NOT EXISTS stories (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  city        TEXT NOT NULL,
  trait       TEXT NOT NULL,
  text        TEXT NOT NULL CHECK (char_length(text) BETWEEN 1 AND 280),
  name        TEXT,
  approved    BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS stories_approved_created_idx
  ON stories (approved, created_at DESC);
