import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logoSvg from '../../assets/the_joshi_designs_logo copy copy.svg';

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Services', href: '#services' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(11, 11, 11, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
          height: 64,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center"
            aria-label="The Joshi Designs — Home"
          >
            <span style={{ fontSize: '18px', fontWeight: '600', letterSpacing: '0.05em', color: '#111827' }}>THE JOSHI DESIGNS</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: '#8A8A8A' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#111827')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#8A8A8A')}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('#start-project')}
              className="btn-ghost text-sm"
            >
              Start a Project
            </button>
          </div>

          <button
            className="md:hidden p-2"
            style={{ color: '#111827' }}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col"
          style={{ background: 'rgba(8, 8, 8, 0.98)', backdropFilter: 'blur(16px)' }}
        >
          <div className="flex items-center justify-between px-6 h-16">
            <img src={logoSvg} alt="The Joshi Designs" height={32} style={{ maxHeight: 32, width: 'auto' }} />
            <button
              className="p-2"
              style={{ color: '#111827' }}
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          <div className="flex flex-col items-center justify-center flex-1 gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-3xl font-light transition-colors duration-200"
                style={{ color: '#111827' }}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('#start-project')}
              className="btn-ghost mt-4 text-base"
            >
              Start a Project
            </button>
          </div>
        </div>
      )}
    </>
  );
}
