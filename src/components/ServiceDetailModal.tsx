import React, { useEffect } from 'react';
import { X, CheckCircle2, FileCheck2, Send } from 'lucide-react';
import { Language, ServiceOffer } from '../types';

interface ServiceDetailModalProps {
  service: ServiceOffer | null;
  lang?: Language;
  onClose: () => void;
  onInquire: (serviceId: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  lang = 'sv',
  onClose,
  onInquire,
}) => {
  const isEn = lang === 'en';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (service) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [service, onClose]);

  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#081724] text-white border border-white/15 shadow-2xl flex flex-col"
      >
        {/* Header Image banner */}
        <div className="relative h-60 sm:h-72 w-full shrink-0 overflow-hidden bg-neutral-950">
          <img
            src={service.imagePath}
            alt={service.alt}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081724] via-[#081724]/40 to-black/40" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label={isEn ? 'Close details' : 'Stäng detaljfönster'}
            className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-transform active:scale-95 cursor-pointer shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category Pill */}
          <div className="absolute bottom-4 left-5 sm:left-6 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500 text-neutral-950 font-mono font-bold text-xs">
              {service.category}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 space-y-5 sm:space-y-6">
          <div>
            <div className="text-xs font-mono text-emerald-400 font-bold tracking-widest uppercase mb-1">
              {service.kicker}
            </div>
            <h3
              id="service-modal-title"
              className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
            >
              {service.title}
            </h3>
            <p className="text-emerald-300 font-medium text-base mt-1">
              {service.subtitle}
            </p>
          </div>

          <p className="text-neutral-300 text-base sm:text-lg leading-relaxed font-sans">
            {service.fullDescription || service.body}
          </p>

          {/* Bullets */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">
              {isEn ? 'Scope & Methodology' : 'Omfattning & Metodik'}
            </h4>
            <div className="space-y-2">
              {service.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                  <span className="text-sm sm:text-base text-neutral-200">
                    {bullet}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          {service.deliverables && service.deliverables.length > 0 && (
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase">
                <FileCheck2 className="w-4 h-4" />
                <span>{isEn ? 'Key Deliverables' : 'Konkreta slutleveranser'}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-neutral-300">
                {service.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-neutral-400 font-mono">
              {isEn
                ? 'DECA Desidera Energy Consulting Agency AB • Advisory & Execution'
                : 'DECA Desidera Energy Consulting Agency AB • Rådgivning & genomförande'}
            </span>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 text-neutral-200 text-sm font-semibold transition-colors cursor-pointer"
              >
                {isEn ? 'Close' : 'Stäng'}
              </button>
              <button
                type="button"
                onClick={() => {
                  onInquire(service.id);
                  onClose();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm transition-transform active:scale-95 shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{service.ctaText}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
