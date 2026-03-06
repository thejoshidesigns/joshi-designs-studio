/*
  # Add direction column to brand_logos and seed sample data

  1. Changes
    - `brand_logos` table: add `row` column ('row1' or 'row2') to control which conveyor belt row each logo appears in
    - Seed 16 sample brand logo entries (8 per row) using well-known brand SVG logos from public CDNs

  2. Notes
    - row1 scrolls left-to-right
    - row2 scrolls right-to-left
    - Logos are displayed white/inverted via CSS filter, so color doesn't matter
    - All logos set to is_visible = true
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'brand_logos' AND column_name = 'row'
  ) THEN
    ALTER TABLE brand_logos ADD COLUMN row text NOT NULL DEFAULT 'row1';
  END IF;
END $$;

INSERT INTO brand_logos (brand_name, logo_url, row, sort_order, is_visible) VALUES
  ('Netflix', 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg', 'row1', 1, true),
  ('Spotify', 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg', 'row1', 2, true),
  ('Slack', 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg', 'row1', 3, true),
  ('Figma', 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg', 'row1', 4, true),
  ('Notion', 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png', 'row1', 5, true),
  ('Vercel', 'https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png', 'row1', 6, true),
  ('GitHub', 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg', 'row1', 7, true),
  ('Adobe', 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg', 'row1', 8, true),
  ('Canva', 'https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg', 'row2', 1, true),
  ('Shopify', 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg', 'row2', 2, true),
  ('HubSpot', 'https://upload.wikimedia.org/wikipedia/commons/3/3f/HubSpot_Logo.svg', 'row2', 3, true),
  ('Webflow', 'https://upload.wikimedia.org/wikipedia/commons/9/92/Webflow_logo_2023.svg', 'row2', 4, true),
  ('Stripe', 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg', 'row2', 5, true),
  ('Mailchimp', 'https://upload.wikimedia.org/wikipedia/commons/1/12/Mailchimp_Logo.svg', 'row2', 6, true),
  ('Zapier', 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Zapier_logo.svg', 'row2', 7, true),
  ('Airtable', 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Airtable_Logo.svg', 'row2', 8, true)
ON CONFLICT DO NOTHING;
