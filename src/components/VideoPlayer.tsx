import { useEffect, useRef } from 'react';

interface VideoPlayerProps {
  youtubeId?: string;
  title: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

export default function VideoPlayer({ youtubeId, title, onPlay, onPause }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // For a production setup, you'd use YouTube IFrame API for granular control
  // This embeds the video; events require the YT API loaded separately

  useEffect(() => {
    // Notify parent that video started (simulated)
    onPlay?.();
    return () => { onPause?.(); };
  }, [youtubeId]);

  if (!youtubeId) {
    return (
      <div className="aspect-video rounded-xl bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">No video available</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative aspect-video rounded-xl overflow-hidden bg-muted shadow-lg">
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
        title={title}
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
