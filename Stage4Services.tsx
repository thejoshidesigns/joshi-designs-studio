import { useState } from 'react';
import { Layers, PenTool, Zap, MessageSquare, LucideIcon } from 'lucide-react';
import { useSupabaseQuery } from '../../hooks/useSupabase';
import { Service } from '../../types';
import MascotDisplay from '../shared/MascotDisplay';
import { MascotPersonality } from '../../hooks/useMascotAnimation';

const iconMap: Record<string, LucideIcon> = {
  Layers,
  PenTool,
  Zap,
  MessageSquare,
};

const SERVICE_PERSONALITIES: MascotPersonality[] = ['thinker', 'architect', 'corporate', 'experiment'];

function ServiceCard({
  service,
  isActive,
  onHover,
}: {
  service: Service;
  isActive: boolean;
  onHover: (id: string | null) => void;
}) {
  const Icon = service.icon_name ? iconMap[service.icon_name] ?? Layers : Layers;

  return (
    <div
      className="card-base p-6 md:p-8 cursor-pointer transition-all duration-300"
      style={
        isActive
          ? {
              borderColor: 'rgba(91,200,192,0.35)',
              background: 'rgba(91,200,192,0.04)',
              boxShadow: '0 0 32px rgba(91,200,192,0.08)',
              transform: 'scale(1.02)',
            }
          : {}
      }
      onMouseEnter={() => onHover(service.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(service.id)}
      onBlur={() => onHover(null)}
      tabIndex={0}
      role="article"
      aria-label={service.name}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
        style={{
          background: isActive ? 'rgba(91,200,192,0.15)' : 'rgba(255,255,255,0.04)',
          border: isActive ? '1px solid rgba(91,200,192,0.3)' : '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <Icon size={18} style={{ color: isActive ? '#ff9a3c' : '#8A8A8A' }} />
      </div>

      <h3
        className="text-base font-semibold mb-2"
        style={{ color: '#111827' }}
      >
        {service.name}
      </h3>

      <p className="text-sm leading-relaxed" style={{ color: '#8A8A8A' }}>
        {service.short_description}
      </p>

      {isActive && service.detail_copy && (
        <p
          className="text-sm leading-relaxed mt-3 pt-3"
          style={{
            color: '#111827',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {service.detail_copy}
        </p>
      )}
    </div>
  );
}

export default function Stage4Services() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { data: services, loading } = useSupabaseQuery<Service>('services', {
    filter: { column: 'is_visible', value: true },
    orderBy: { column: 'sort_order', ascending: true },
  });

  const activeIndex = services.findIndex((s) => s.id === activeId);
  const activeMascotPersonality: MascotPersonality =
    activeIndex >= 0 ? SERVICE_PERSONALITIES[activeIndex % SERVICE_PERSONALITIES.length] : 'thinker';

  return (
    <section id="services" className="stage-section py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="section-label mb-3">Services</p>
          <h2
            className="text-3xl md:text-4xl font-semibold"
            style={{ color: '#111827', letterSpacing: '-0.02em' }}
          >
            What We Build.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,280px] gap-10 items-start">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {loading
              ? [1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="rounded-2xl"
                    style={{
                      height: 160,
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      animation: 'pulse 2s ease-in-out infinite',
                    }}
                  />
                ))
              : services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    isActive={activeId === service.id}
                    onHover={setActiveId}
                  />
                ))}
          </div>

          <div className="hidden lg:flex flex-col items-center justify-start pt-4 sticky top-32">
            <MascotDisplay
              src={"/src/assets/1 copy copy.svg"}
              roleName={activeId ? (services.find((s) => s.id === activeId)?.name ?? 'Thinking') : 'Hover a service'}
              personality={activeMascotPersonality}
              style={{ maxHeight: 220, maxWidth: 180 }}
            />
            <div
              className="mt-4 rounded-xl p-4 text-sm leading-relaxed text-center transition-all duration-400"
              style={{
                background: activeId ? 'rgba(91,200,192,0.06)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${activeId ? 'rgba(91,200,192,0.2)' : 'rgba(255,255,255,0.06)'}`,
                color: activeId ? '#111827' : '#8A8A8A',
                maxWidth: 240,
              }}
            >
              {activeId
                ? (services.find((s) => s.id === activeId)?.detail_copy ?? services.find((s) => s.id === activeId)?.short_description ?? '')
                : 'Hover over a service to explore what we can build together.'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
