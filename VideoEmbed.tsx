import { useEffect, useRef, useState } from 'react';

interface VideoEmbedProps {
  url: string;
  title?: string;
  className?: string;
}

function getVideoType(url: string): 'vimeo' | 'youtube' | 'mp4' {
  if (url.includes('vimeo.com')) return 'vimeo';
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
  return 'mp4';
}

function getVimeoId(url: string): string {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : '';
}

function getYouTubeId(url: string): string {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  return match ? match[1] : '';
}

export default function VideoEmbed({ url, title = 'Video', className = '' }: VideoEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const type = getVideoType(url);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-xl bg-bg-secondary ${className}`}
      style={{ paddingTop: '56.25%' }}
    >
      {isVisible && (
        <>
          {type === 'vimeo' && (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://player.vimeo.com/video/${getVimeoId(url)}?autoplay=0&title=0&byline=0&portrait=0`}
              title={title}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          )}
          {type === 'youtube' && (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${getYouTubeId(url)}`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
          {type === 'mp4' && (
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src={url}
              controls
              preload="none"
              title={title}
            />
          )}
        </>
      )}
    </div>
  );
}
