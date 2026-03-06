export const COLORS = {
  bgPrimary: '#0B0B0B',
  bgSecondary: '#080808',
  textPrimary: '#EAEAEA',
  textSecondary: '#8A8A8A',
  accent: '#ff9a3c',
  accentDark: '#3AADA5',
  border: 'rgba(255, 255, 255, 0.06)',
  borderAccent: 'rgba(255, 154, 60, 0.3)',
} as const;

export const SERVICES_LIST = [
  'Brand Identity',
  'Content Strategy',
  'Campaign Production',
  'Narrative Engineering',
  'Not Sure Yet',
] as const;

export const TIMELINE_OPTIONS = [
  'ASAP (under 2 weeks)',
  '1 Month',
  '2–3 Months',
  'Flexible',
] as const;

export const BUDGET_OPTIONS = [
  'Under $1K',
  '$1K–$5K',
  '$5K–$15K',
  '$15K+',
  "Let's talk",
] as const;

export const REFERRAL_OPTIONS = [
  'Referral',
  'Instagram',
  'LinkedIn',
  'Google Search',
  'Other',
] as const;
