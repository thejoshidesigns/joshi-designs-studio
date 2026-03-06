import { useMascotAnimation, MascotPersonality } from '../../hooks/useMascotAnimation';

interface MascotDisplayProps {
  src?: string | null;
  alt?: string;
  roleName?: string;
  personality?: MascotPersonality;
  className?: string;
  style?: React.CSSProperties;
}

export default function MascotDisplay({
  src,
  alt = 'Mascot character',
  roleName,
  personality = 'idle',
  className = '',
  style,
}: MascotDisplayProps) {
  const wrapperRef = useMascotAnimation(personality);

  if (src) {
    return (
      <div ref={wrapperRef} className={`inline-block ${className}`} style={style}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          width={400}
          height={500}
          className="object-contain w-full h-full"
          style={{
            filter: 'drop-shadow(0 8px 32px rgba(91,200,192,0.22))',
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className={`mascot-placeholder ${className}`}
      style={{ width: 200, height: 260, ...style }}
      aria-label={`${roleName || 'Mascot'} — coming soon`}
    >
      <div className="flex flex-col items-center gap-2">
        <div
          className="w-12 h-12 rounded-full border-2 border-dashed flex items-center justify-center text-lg"
          style={{ borderColor: 'rgba(255, 154, 60, 0.5)', color: 'rgba(255, 154, 60, 0.6)' }}
        >
          ?
        </div>
        {roleName && (
          <span style={{ color: 'rgba(255, 154, 60, 0.6)', fontSize: '0.7rem', textAlign: 'center' }}>
            {roleName}
          </span>
        )}
      </div>
    </div>
  );
}
