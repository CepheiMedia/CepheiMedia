-- Website inquiries (intake form submissions)
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  services_requested JSONB,         -- e.g. ["dtm","ddm"]
  budget_range TEXT,                -- e.g. "starter", "growth", "scale"
  project_details TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS: public insert (anon key via server action), admin-only read
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert inquiry" ON inquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins read inquiries" ON inquiries
  FOR SELECT USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );
