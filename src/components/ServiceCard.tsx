import { useEffect, useRef, useState } from "react";

interface ServiceContent {
  purpose: string;
  deliverables: string;
  outcome: string;
  value: string;
}

interface ServiceCardProps {
  title: string;
  content: ServiceContent;
  index: number;
}

export function ServiceCard({ title, content, index }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const cardHeight = rect.height;
      
      // Calculate scroll progress based on card position
      const cardTop = rect.top;
      const cardBottom = rect.bottom;
      
      // Start revealing content when card enters viewport
      if (cardTop < viewportHeight && cardBottom > 0) {
        // Progress from 0 to 1 as card moves through viewport
        const progress = Math.max(0, Math.min(1, 
          (viewportHeight - cardTop) / (viewportHeight * 0.5)
        ));
        setScrollProgress(progress);
      } else if (cardTop >= viewportHeight) {
        setScrollProgress(0);
      } else if (cardBottom <= 0) {
        setScrollProgress(1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const titleOpacity = Math.max(0, 1 - scrollProgress * 1.5);
  const contentOpacity = Math.min(1, scrollProgress * 1.5);

  return (
    <div 
      ref={cardRef}
      className="relative w-full transition-all duration-300"
      style={{
        top: `${index * 10}px`,
        zIndex: 10 - index,
      }}
    >
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-lg hover:bg-white/15 hover:border-white/30 transition-all duration-300 overflow-hidden min-h-[280px] sm:min-h-[320px] md:min-h-[360px] p-8 sm:p-10 md:p-12">
        {/* Title Layer */}
        <div 
          className="absolute inset-0 flex items-center justify-center p-8 sm:p-10 md:p-12 pointer-events-none transition-opacity duration-500"
          style={{ opacity: titleOpacity }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center leading-tight">
            {title}
          </h2>
        </div>

        {/* Content Layer */}
        <div 
          className="relative transition-opacity duration-500"
          style={{ opacity: contentOpacity }}
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-5 md:mb-6">{title}</h3>
          <div className="text-white text-sm sm:text-base space-y-3 sm:space-y-4 leading-relaxed">
            <p><strong className="font-semibold">Purpose:</strong> {content.purpose}</p>
            <p><strong className="font-semibold">Key deliverables:</strong> {content.deliverables}</p>
            <p><strong className="font-semibold">Outcome:</strong> {content.outcome}</p>
            <p><strong className="font-semibold">Value:</strong> {content.value}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
