import { Instagram, Linkedin, Twitter } from 'lucide-react';
import logoSvg from '../../assets/the_joshi_designs_logo copy copy.svg';

export default function Footer() {
  return (
    <footer
      className="w-full border-t"
      style={{ background: '#080808', borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={logoSvg} alt="The Joshi Designs" height={28} style={{ maxHeight: 28, width: 'auto' }} />
            <span className="text-sm" style={{ color: '#8A8A8A' }}>
              © 2025 The Joshi Designs. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm transition-colors duration-200"
              style={{ color: '#8A8A8A' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#111827')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#8A8A8A')}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm transition-colors duration-200"
              style={{ color: '#8A8A8A' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#111827')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#8A8A8A')}
            >
              Terms
            </a>
          </div>

          <div className="flex items-center gap-4">
            {[
              { Icon: Instagram, label: 'Instagram', href: '#' },
              { Icon: Linkedin, label: 'LinkedIn', href: '#' },
              { Icon: Twitter, label: 'Twitter', href: '#' },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="transition-colors duration-200 p-1"
                style={{ color: '#8A8A8A' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#ff9a3c')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#8A8A8A')}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
