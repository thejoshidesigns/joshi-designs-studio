/*
  # Create Core Tables for Joshi Designs

  ## Tables Created

  ### 1. `projects`
  - Portfolio project showcase entries
  - Columns: id, title, category, outcome, thumbnail_url, video_url, sort_order, is_visible, created_at

  ### 2. `services`
  - Services offered by Joshi Designs
  - Columns: id, name, short_description, detail_copy, icon_name, sort_order, is_visible
  - Pre-seeded with 4 services

  ### 3. `brand_logos`
  - Client/partner brand logos for the ticker section
  - Columns: id, brand_name, logo_url, link_url, sort_order, is_visible

  ### 4. `project_inquiries`
  - Lead capture form submissions
  - Columns: id, name, email, company, website, services_needed, project_description,
    timeline, budget, referral_source, additional_notes, submitted_at, status

  ## Security
  - RLS enabled on all tables
  - projects, services, brand_logos: public SELECT for anon role
  - project_inquiries: public INSERT for anon role only (no public read)
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL DEFAULT '',
  outcome text,
  thumbnail_url text,
  video_url text,
  sort_order integer DEFAULT 0,
  is_visible boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view visible projects"
  ON projects FOR SELECT
  TO anon, authenticated
  USING (is_visible = true);

CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  short_description text NOT NULL DEFAULT '',
  detail_copy text,
  icon_name text,
  sort_order integer DEFAULT 0,
  is_visible boolean DEFAULT true
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view visible services"
  ON services FOR SELECT
  TO anon, authenticated
  USING (is_visible = true);

INSERT INTO services (name, short_description, detail_copy, icon_name, sort_order) VALUES
  ('Brand Identity Systems', 'Logo, tone, visual language — built as a coherent system.', 'We build brand identities that hold together across every channel. Not just a logo — a complete system of visual and verbal language that scales without losing its edge.', 'Layers', 1),
  ('Content Strategy', 'What to say, where, when, and why it will work.', 'Strategy before production. We map your audience, define your content pillars, and create a publishing system that builds compounding attention — not just one-off posts.', 'PenTool', 2),
  ('Campaign Production', 'End-to-end creative production for launches and campaigns.', 'Full-service creative production — video, copy, design — coordinated into campaigns that move people from unaware to converted. Built on your timeline.', 'Zap', 3),
  ('Narrative Engineering', 'Positioning, messaging, and story architecture.', 'The strategic foundation everything else is built on. We define your position in the market, your core messaging framework, and the story that makes your brand impossible to ignore.', 'MessageSquare', 4)
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS brand_logos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_name text NOT NULL,
  logo_url text NOT NULL,
  link_url text,
  sort_order integer DEFAULT 0,
  is_visible boolean DEFAULT true
);

ALTER TABLE brand_logos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view visible brand logos"
  ON brand_logos FOR SELECT
  TO anon, authenticated
  USING (is_visible = true);

CREATE TABLE IF NOT EXISTS project_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text NOT NULL,
  website text,
  services_needed text[] DEFAULT '{}',
  project_description text NOT NULL DEFAULT '',
  timeline text NOT NULL DEFAULT '',
  budget text,
  referral_source text,
  additional_notes text,
  submitted_at timestamptz DEFAULT now(),
  status text DEFAULT 'new'
);

ALTER TABLE project_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a project inquiry"
  ON project_inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
