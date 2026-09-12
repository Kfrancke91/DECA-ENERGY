import React from 'react';
import { ArrowRight, Layers, ArrowUpRight } from 'lucide-react';
import { Language, ServiceOffer, TranslationContent } from '../types';

interface ServicesOverviewProps {
  content: TranslationContent['services'];
  lang?: Language;
  onSelectService: (service: ServiceOffer) => void;
  onOpenServices: (serviceId?: string) => void;
}

export const ServicesOverview: React.FC<ServicesOverviewProps> = ({
  content,
  lang = 'sv',
  onSelectService,
  onOpenServices,
}) => {
  const isEn = lang === 'en';

  return (
    <section id="services-overview" className="py-14 sm:py-24 bg-[#0a1926] text-white relative overflow-hidden">
      {/* Subtle ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-5">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-3 sm:mb-4">
              <Layers className="w-3.5 h-3.5" />
              <span>{content.eyebrow}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3 sm:mb-4">
              {content.title}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-neutral-300 font-sans leading-relaxed">
              {content.intro}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenServices()}
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors shrink-0 group self-start md:self-auto cursor-pointer min-h-[44px] py-2"
          >
            <span>{content.browseAll}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 4 Interactive Visual Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch">
          {content.items.map((service) => (
            <div
              key={service.id}
              onClick={() => onOpenServices(service.id)}
              className="group relative rounded-2xl bg-[#0d2232] border border-white/10 overflow-hidden flex flex-col justify-between hover:border-emerald-400/50 hover:bg-[#102b40] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1.5 h-full"
            >
              {/* Image Preview Thumbnail Header */}
              <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-neutral-950">
                <img
                  src={service.imagePath}
                  alt={service.alt}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-95 group-hover:brightness-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d2232] via-[#0d2232]/30 to-transparent" />
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-emerald-400/90 tracking-wider mb-2 uppercase">
                    {service.category}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug mb-2.5">
                    {service.title}
                  </h3>
                  <p className="text-sm text-neutral-300 line-clamp-3 leading-relaxed mb-4">
                    {service.body}
                  </p>
                </div>

                {/* Footer Controls */}
                <div className="pt-3.5 border-t border-white/10 flex items-center justify-between text-xs font-semibold">
                  <span className="text-emerald-400 group-hover:text-emerald-300 flex items-center gap-1">
                    <span>{isEn ? 'Explore' : 'Utforska'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectService(service);
                    }}
                    className="text-neutral-400 hover:text-white px-2.5 py-1.5 rounded hover:bg-white/10 transition-colors min-h-[32px] cursor-pointer"
                  >
                    {isEn ? 'Details' : 'Detaljer'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
