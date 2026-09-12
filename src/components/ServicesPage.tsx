import React, { useEffect } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  ArrowRight,
  Maximize2,
  FileCheck2,
  Send,
  Sparkles,
  Zap,
} from 'lucide-react';
import { Language, ServiceOffer, TranslationContent } from '../types';

interface ServicesPageProps {
  content: TranslationContent['services'];
  lang?: Language;
  onSelectService: (service: ServiceOffer) => void;
  onInquire: (serviceId: string) => void;
  onNavigateHome: (sectionId?: string) => void;
  targetServiceId?: string | null;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  content,
  lang = 'sv',
  onSelectService,
  onInquire,
  onNavigateHome,
  targetServiceId,
}) => {
  const isEn = lang === 'en';

  // If navigated with a target service ID (e.g., 'offer-design'), scroll to it
  useEffect(() => {
    if (targetServiceId) {
      const el = document.getElementById(targetServiceId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [targetServiceId]);

  return (
    <div className="pt-24 pb-20 bg-[#f8faf8] text-[#0c1a21] min-h-screen">
      {/* Top Banner & Breadcrumb */}
      <div className="bg-[#03111c] text-white py-14 sm:py-20 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/40 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <div className="mb-6">
            <button
              type="button"
              onClick={() => onNavigateHome('home')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>{isEn ? 'Back to home' : 'Tillbaka till startsidan'}</span>
            </button>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-4">
              <Zap className="w-3.5 h-3.5" />
              <span>{content.eyebrow}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              {content.title}
            </h1>
            <p className="text-base sm:text-xl text-neutral-300 font-sans leading-relaxed">
              {content.intro}
            </p>
          </div>
        </div>
      </div>

      {/* Main Focus Areas Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
        <div className="space-y-16 sm:space-y-32">
          {content.items.map((service, index) => {
            const isReversed = index % 2 === 1;

            return (
              <article
                key={service.id}
                id={service.id}
                className="scroll-mt-24 sm:scroll-mt-28"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center ${
                    isReversed ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Image Column */}
                  <div
                    className={`lg:col-span-6 ${
                      isReversed ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div
                      onClick={() => onSelectService(service)}
                      className="group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border border-neutral-300/80 bg-neutral-900 cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-emerald-900/10"
                    >
                      <div className="aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden">
                        <img
                          src={service.imagePath}
                          alt={service.alt}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
                          loading="lazy"
                        />
                      </div>

                      {/* Image Overlay Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                      {/* Top Badge */}
                      <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 flex items-center gap-2">
                        <span className="px-2.5 sm:px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-medium">
                          {service.category}
                        </span>
                      </div>

                      {/* Click to expand hint */}
                      <div className="absolute bottom-3.5 right-3.5 sm:bottom-4 sm:right-4 flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/90 hover:bg-white text-neutral-950 text-xs font-semibold shadow-lg backdrop-blur-sm transition-transform duration-200 group-hover:scale-105">
                        <Maximize2 className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{isEn ? 'Click for details' : 'Klicka för detaljer'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div
                    className={`lg:col-span-6 ${
                      isReversed ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <div className="space-y-4 sm:space-y-6">
                      <div className="text-xs font-mono font-bold tracking-widest text-emerald-700 uppercase">
                        {service.kicker}
                      </div>

                      <div>
                        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-[#03111c] tracking-tight leading-tight mb-2">
                          {service.title}
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg font-medium text-emerald-800">
                          {service.subtitle}
                        </p>
                      </div>

                      <p className="text-sm sm:text-base md:text-lg text-neutral-700 leading-relaxed font-sans">
                        {service.fullDescription || service.body}
                      </p>

                      {/* Bullet points */}
                      <div className="space-y-2.5 sm:space-y-3 pt-1 sm:pt-2">
                        {service.bullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="text-sm sm:text-base text-neutral-800 font-medium leading-snug">
                              {bullet}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Deliverables Box */}
                      {service.deliverables && service.deliverables.length > 0 && (
                        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-sm mt-3 sm:mt-4">
                          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider mb-2.5 sm:mb-3">
                            <FileCheck2 className="w-4 h-4 text-emerald-600" />
                            <span>{content.deliverablesLabel}</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-neutral-700">
                            {service.deliverables.map((item, dIdx) => (
                              <div key={dIdx} className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-3 sm:pt-4">
                        <button
                          type="button"
                          onClick={() => onInquire(service.id)}
                          className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm transition-all duration-150 shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer min-h-[44px]"
                        >
                          <Send className="w-4 h-4" />
                          <span>{content.inquireService}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onSelectService(service)}
                          className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white hover:bg-neutral-50 text-neutral-800 font-semibold text-sm border border-neutral-300 shadow-sm transition-all duration-150 active:scale-95 cursor-pointer min-h-[44px]"
                        >
                          <span>{content.viewDetails}</span>
                          <ArrowRight className="w-4 h-4 text-emerald-700" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-14 sm:mt-28 rounded-3xl bg-[#03111c] text-white p-5 sm:p-12 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {isEn ? 'Commercial & Technical Advisory' : 'Kommersiell & Teknisk Rådgivning'}
              </span>
            </div>
            <h3 className="text-xl sm:text-3xl font-extrabold tracking-tight mb-3 sm:mb-4">
              {isEn
                ? 'Need guidance on a specific solar or storage project?'
                : 'Behöver du vägledning för ett specifikt sol- eller lagringsprojekt?'}
            </h3>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6 font-sans">
              {isEn
                ? 'From technical grid interconnection reviews and Single-Line Diagrams to complete market entrance in the Nordics. We tailor every engagement to your project requirements.'
                : 'Från teknisk granskning av nätanslutning och SLD till fullständig marknadsetablering i Norden. Vi anpassar uppdraget efter dina behov.'}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => onNavigateHome('contact')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm transition-all duration-150 shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer min-h-[44px]"
              >
                <span>{isEn ? 'Contact Daniel Desidera' : 'Kontakta Daniel Desidera'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigateHome('home')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-all duration-150 cursor-pointer min-h-[44px]"
              >
                <span>{isEn ? 'Back to home' : 'Tillbaka till startsidan'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
