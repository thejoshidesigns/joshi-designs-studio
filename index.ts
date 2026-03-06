export interface Project {
  id: string;
  title: string;
  category: string;
  outcome: string | null;
  thumbnail_url: string | null;
  video_url: string | null;
  sort_order: number;
  is_visible: boolean;
  created_at: string;
}

export interface Service {
  id: string;
  name: string;
  short_description: string;
  detail_copy: string | null;
  icon_name: string | null;
  sort_order: number;
  is_visible: boolean;
}

export interface BrandLogo {
  id: string;
  brand_name: string;
  logo_url: string;
  link_url: string | null;
  row?: string;
  sort_order: number;
  is_visible: boolean;
}

export interface ProjectInquiry {
  id?: string;
  name: string;
  email: string;
  company: string;
  website: string | null;
  services_needed: string[];
  project_description: string;
  timeline: string;
  budget: string | null;
  referral_source: string | null;
  additional_notes: string | null;
  submitted_at?: string;
  status?: string;
}
