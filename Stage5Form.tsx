import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { SERVICES_LIST, TIMELINE_OPTIONS, BUDGET_OPTIONS, REFERRAL_OPTIONS } from '../../lib/constants';
import { ProjectInquiry } from '../../types';

type FormErrors = Partial<Record<keyof ProjectInquiry, string>>;

const initialForm: ProjectInquiry = {
  name: '',
  email: '',
  company: '',
  website: '',
  services_needed: [],
  project_description: '',
  timeline: '',
  budget: '',
  referral_source: '',
  additional_notes: '',
};

function InputField({
  label,
  id,
  error,
  required,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium mb-2"
        style={{ color: '#111827' }}
      >
        {label}
        {required && <span style={{ color: '#ff9a3c' }}> *</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs" style={{ color: 'rgba(255,100,100,0.9)' }}>
          {error}
        </p>
      )}
    </div>
  );
}

const inputStyle = (hasError: boolean): React.CSSProperties => ({
  width: '100%',
  background: 'rgba(255,255,255,0.03)',
  border: `1px solid ${hasError ? 'rgba(255,100,100,0.6)' : 'rgba(255,255,255,0.08)'}`,
  borderRadius: 12,
  padding: '12px 16px',
  color: '#111827',
  fontSize: '0.875rem',
  outline: 'none',
  transition: 'border-color 0.2s ease',
});

export default function Stage5Form() {
  const [form, setForm] = useState<ProjectInquiry>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!form.company.trim()) newErrors.company = 'Company name is required';
    if (form.services_needed.length === 0) newErrors.services_needed = 'Select at least one service';
    if (!form.project_description.trim()) newErrors.project_description = 'Please describe your project';
    if (!form.timeline) newErrors.timeline = 'Select a timeline';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleServiceToggle = (service: string) => {
    setForm((prev) => ({
      ...prev,
      services_needed: prev.services_needed.includes(service)
        ? prev.services_needed.filter((s) => s !== service)
        : [...prev.services_needed, service],
    }));
    if (errors.services_needed) {
      setErrors((prev) => ({ ...prev, services_needed: undefined }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError(null);

    const { error } = await supabase.from('project_inquiries').insert({
      name: form.name,
      email: form.email,
      company: form.company,
      website: form.website || null,
      services_needed: form.services_needed,
      project_description: form.project_description,
      timeline: form.timeline,
      budget: form.budget || null,
      referral_source: form.referral_source || null,
      additional_notes: form.additional_notes || null,
    });

    setSubmitting(false);

    if (error) {
      setSubmitError('Something went wrong. Please try again or email us directly.');
    } else {
      setSubmitted(true);
    }
  };

  return (
    <section id="start-project" className="stage-section py-24 relative" style={{ background: '#080808' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 40% 50% at 85% 50%, rgba(91,200,192,0.04) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,360px] gap-16 items-start">
          <div className="max-w-2xl">
            <div className="mb-12">
              <p className="section-label mb-3">Start a Project</p>
              <h2
                className="text-3xl md:text-4xl font-semibold"
                style={{ color: '#111827', letterSpacing: '-0.02em' }}
              >
                Let's Build Something That Lasts.
              </h2>
              <p className="mt-3 text-base" style={{ color: '#8A8A8A' }}>
                Fill in as much as you know. We'll figure out the rest together.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-16">
                <div className="flex justify-center mb-6">
                  <div className="mascot-placeholder" style={{ width: 140, height: 180 }}>
                    Celebrate
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-3" style={{ color: '#111827' }}>
                  Got it.
                </h3>
                <p className="text-base" style={{ color: '#8A8A8A' }}>
                  We'll be in touch within 48 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-2xl p-8 md:p-10 space-y-6"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Your Name" id="name" error={errors.name} required>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="First name is fine"
                      style={inputStyle(!!errors.name)}
                      onFocus={(e) => { e.target.style.borderColor = 'rgba(91,200,192,0.5)'; }}
                      onBlur={(e) => { e.target.style.borderColor = errors.name ? 'rgba(255,100,100,0.6)' : 'rgba(255,255,255,0.08)'; }}
                    />
                  </InputField>

                  <InputField label="Email Address" id="email" error={errors.email} required>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      style={inputStyle(!!errors.email)}
                      onFocus={(e) => { e.target.style.borderColor = 'rgba(91,200,192,0.5)'; }}
                      onBlur={(e) => { e.target.style.borderColor = errors.email ? 'rgba(255,100,100,0.6)' : 'rgba(255,255,255,0.08)'; }}
                    />
                  </InputField>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Company / Brand Name" id="company" error={errors.company} required>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="What do we call your brand?"
                      style={inputStyle(!!errors.company)}
                      onFocus={(e) => { e.target.style.borderColor = 'rgba(91,200,192,0.5)'; }}
                      onBlur={(e) => { e.target.style.borderColor = errors.company ? 'rgba(255,100,100,0.6)' : 'rgba(255,255,255,0.08)'; }}
                    />
                  </InputField>

                  <InputField label="Website or Social Handle" id="website">
                    <input
                      id="website"
                      name="website"
                      type="text"
                      value={form.website ?? ''}
                      onChange={handleChange}
                      placeholder="yoursite.com or @handle"
                      style={inputStyle(false)}
                      onFocus={(e) => { e.target.style.borderColor = 'rgba(91,200,192,0.5)'; }}
                      onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                    />
                  </InputField>
                </div>

                <InputField label="What do you need help with?" id="services_needed" error={errors.services_needed} required>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {SERVICES_LIST.map((service) => {
                      const active = form.services_needed.includes(service);
                      return (
                        <button
                          key={service}
                          type="button"
                          onClick={() => handleServiceToggle(service)}
                          className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                          style={{
                            background: active ? 'rgba(91,200,192,0.12)' : 'rgba(255,255,255,0.03)',
                            border: active ? '1px solid rgba(91,200,192,0.5)' : '1px solid rgba(255,255,255,0.08)',
                            color: active ? '#ff9a3c' : '#8A8A8A',
                          }}
                        >
                          {service}
                        </button>
                      );
                    })}
                  </div>
                </InputField>

                <InputField label="Describe your project" id="project_description" error={errors.project_description} required>
                  <textarea
                    id="project_description"
                    name="project_description"
                    value={form.project_description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="What's the context, what's the problem, what does success look like?"
                    style={{ ...inputStyle(!!errors.project_description), resize: 'vertical', minHeight: 96 }}
                    onFocus={(e) => { e.target.style.borderColor = 'rgba(91,200,192,0.5)'; }}
                    onBlur={(e) => { e.target.style.borderColor = errors.project_description ? 'rgba(255,100,100,0.6)' : 'rgba(255,255,255,0.08)'; }}
                  />
                </InputField>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="What's your timeline?" id="timeline" error={errors.timeline} required>
                    <select
                      id="timeline"
                      name="timeline"
                      value={form.timeline}
                      onChange={handleChange}
                      style={{ ...inputStyle(!!errors.timeline), cursor: 'pointer' }}
                      onFocus={(e) => { e.target.style.borderColor = 'rgba(91,200,192,0.5)'; }}
                      onBlur={(e) => { e.target.style.borderColor = errors.timeline ? 'rgba(255,100,100,0.6)' : 'rgba(255,255,255,0.08)'; }}
                    >
                      <option value="" style={{ background: '#0B0B0B' }}>Select timeline</option>
                      {TIMELINE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} style={{ background: '#0B0B0B' }}>{opt}</option>
                      ))}
                    </select>
                  </InputField>

                  <InputField label="Approximate budget" id="budget">
                    <select
                      id="budget"
                      name="budget"
                      value={form.budget ?? ''}
                      onChange={handleChange}
                      style={{ ...inputStyle(false), cursor: 'pointer' }}
                      onFocus={(e) => { e.target.style.borderColor = 'rgba(91,200,192,0.5)'; }}
                      onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                    >
                      <option value="" style={{ background: '#0B0B0B' }}>Select budget (optional)</option>
                      {BUDGET_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} style={{ background: '#0B0B0B' }}>{opt}</option>
                      ))}
                    </select>
                  </InputField>
                </div>

                <InputField label="How did you find us?" id="referral_source">
                  <select
                    id="referral_source"
                    name="referral_source"
                    value={form.referral_source ?? ''}
                    onChange={handleChange}
                    style={{ ...inputStyle(false), cursor: 'pointer' }}
                    onFocus={(e) => { e.target.style.borderColor = 'rgba(91,200,192,0.5)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                  >
                    <option value="" style={{ background: '#0B0B0B' }}>Select source (optional)</option>
                    {REFERRAL_OPTIONS.map((opt) => (
                      <option key={opt} value={opt} style={{ background: '#0B0B0B' }}>{opt}</option>
                    ))}
                  </select>
                </InputField>

                <InputField label="Anything else?" id="additional_notes">
                  <textarea
                    id="additional_notes"
                    name="additional_notes"
                    value={form.additional_notes ?? ''}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Constraints, preferences, or context we should know"
                    style={{ ...inputStyle(false), resize: 'vertical', minHeight: 80 }}
                    onFocus={(e) => { e.target.style.borderColor = 'rgba(91,200,192,0.5)'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                  />
                </InputField>

                {submitError && (
                  <p className="text-sm text-center" style={{ color: 'rgba(255,100,100,0.9)' }}>
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-primary py-4 text-base font-semibold"
                  style={submitting ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
                >
                  {submitting ? 'Sending...' : 'Send My Project Brief'}
                </button>
              </form>
            )}
          </div>

          <div className="hidden lg:flex flex-col items-center gap-6 sticky top-32 pt-20">
            <div className="mascot-placeholder" style={{ width: 200, height: 260 }}>
              Writer
            </div>
            <div
              className="rounded-2xl p-5 text-center"
              style={{
                background: 'rgba(91,200,192,0.04)',
                border: '1px solid rgba(91,200,192,0.15)',
                maxWidth: 260,
              }}
            >
              <p className="text-sm leading-relaxed mb-3" style={{ color: '#111827' }}>
                "The brief is where strategy starts. The more detail you give, the better we can help."
              </p>
              <p className="text-xs font-semibold" style={{ color: '#ff9a3c' }}>
                — The Joshi Designs Team
              </p>
            </div>

            <div className="space-y-3 w-full" style={{ maxWidth: 260 }}>
              {[
                { icon: '⚡', text: 'Response within 48 hours' },
                { icon: '🔒', text: 'Your brief stays private' },
                { icon: '🎯', text: 'No commitment required' },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', color: '#8A8A8A' }}
                >
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
