import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSupabaseQuery } from '../../hooks/useSupabase';
import { Project } from '../../types';
import VideoEmbed from '../shared/VideoEmbed';

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="card-base flex-shrink-0 w-80 md:w-96 overflow-hidden group">
      <div className="relative overflow-hidden rounded-t-2xl" style={{ paddingTop: '56.25%' }}>
        {project.video_url ? (
          <div className="absolute inset-0">
            <VideoEmbed url={project.video_url} title={project.title} />
          </div>
        ) : project.thumbnail_url ? (
          <img
            src={project.thumbnail_url}
            alt={project.title}
            loading="lazy"
            width={384}
            height={216}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.02)' }}
          >
            <span className="text-xs" style={{ color: '#8A8A8A' }}>No preview</span>
          </div>
        )}
      </div>

      <div className="p-5">
        <span
          className="inline-block text-xs font-semibold tracking-widest uppercase mb-2 px-2 py-1 rounded"
          style={{ background: 'rgba(91,200,192,0.1)', color: '#ff9a3c' }}
        >
          {project.category}
        </span>
        <h3 className="text-base font-semibold mb-2" style={{ color: '#111827' }}>
          {project.title}
        </h3>
        {project.outcome && (
          <p className="text-sm leading-relaxed" style={{ color: '#8A8A8A' }}>
            {project.outcome}
          </p>
        )}
      </div>
    </div>
  );
}

export default function Stage1Work() {
  const railRef = useRef<HTMLDivElement>(null);
  const { data: projects, loading } = useSupabaseQuery<Project>('projects', {
    filter: { column: 'is_visible', value: true },
    orderBy: { column: 'sort_order', ascending: true },
  });

  const scroll = (dir: 'left' | 'right') => {
    if (!railRef.current) return;
    const amount = 400;
    railRef.current.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
  };

  return (
    <section id="work" className="stage-section py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <p className="section-label mb-3">Work</p>
          <h2
            className="text-3xl md:text-4xl font-semibold"
            style={{ color: '#111827', letterSpacing: '-0.02em' }}
          >
            Proof Before Promises.
          </h2>
        </div>

        {loading ? (
          <div className="flex gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex-shrink-0 w-80 md:w-96 rounded-2xl"
                style={{
                  height: 340,
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  animation: 'pulse 2s ease-in-out infinite',
                }}
              />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div
            className="rounded-2xl p-16 text-center"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <p className="text-lg mb-2" style={{ color: '#111827' }}>Work coming soon</p>
            <p className="text-sm" style={{ color: '#8A8A8A' }}>Check back shortly — great things are being documented.</p>
          </div>
        ) : (
          <div className="relative">
            <div
              ref={railRef}
              className="flex gap-6 overflow-x-auto no-scrollbar pb-4"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {projects.map((project) => (
                <div key={project.id} style={{ scrollSnapAlign: 'start' }}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>

            {projects.length > 2 && (
              <div className="flex gap-3 mt-6 justify-end">
                <button
                  onClick={() => scroll('left')}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#8A8A8A',
                  }}
                  aria-label="Scroll left"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(91,200,192,0.4)';
                    e.currentTarget.style.color = '#ff9a3c';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.color = '#8A8A8A';
                  }}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => scroll('right')}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#8A8A8A',
                  }}
                  aria-label="Scroll right"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(91,200,192,0.4)';
                    e.currentTarget.style.color = '#ff9a3c';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.color = '#8A8A8A';
                  }}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
