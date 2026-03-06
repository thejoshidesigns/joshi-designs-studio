import { useSupabaseQuery } from '../../hooks/useSupabase';
import { BrandLogo } from '../../types';

function LogoItem({ logo }: { logo: BrandLogo }) {
  const content = (
    <img
      src={logo.logo_url}
      alt={logo.brand_name}
      loading="lazy"
      height={32}
      style={{ maxHeight: 32, width: 'auto', maxWidth: 100 }}
    />
  );

  if (logo.link_url) {
    return (
      <a
        href={logo.link_url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={logo.brand_name}
        className="brand-logo-item"
      >
        {content}
      </a>
    );
  }

  return <div className="brand-logo-item">{content}</div>;
}

export default function Stage6Logos() {
  const { data: logos, loading } = useSupabaseQuery<BrandLogo>('brand_logos', {
    filter: { column: 'is_visible', value: true },
    orderBy: { column: 'sort_order', ascending: true },
  });

  if (loading || logos.length === 0) return null;

  const row1 = logos.filter((l) => l.row !== 'row2');
  const row2 = logos.filter((l) => l.row === 'row2');

  const row1Doubled = row1.length > 0 ? [...row1, ...row1] : [];
  const row2Doubled = row2.length > 0 ? [...row2, ...row2] : [];

  const allDoubled = logos.length > 0 ? [...logos, ...logos] : [];

  return (
    <section
      className="stage-section py-20 overflow-hidden"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <p className="section-label">Brands We've Built For</p>
        <p className="mt-2 text-sm" style={{ color: 'rgba(255,255,255,0.25)' }}>
          Hover to pause
        </p>
      </div>

      {row1Doubled.length > 0 && row2Doubled.length > 0 ? (
        <div className="space-y-6">
          <div className="ticker-wrap">
            <div className="ticker-container">
              {row1Doubled.map((logo, i) => (
                <LogoItem key={`r1-${logo.id}-${i}`} logo={logo} />
              ))}
            </div>
          </div>

          <div className="ticker-wrap">
            <div className="ticker-container-reverse">
              {row2Doubled.map((logo, i) => (
                <LogoItem key={`r2-${logo.id}-${i}`} logo={logo} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="ticker-wrap">
          <div className="ticker-container">
            {allDoubled.map((logo, i) => (
              <LogoItem key={`${logo.id}-${i}`} logo={logo} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
