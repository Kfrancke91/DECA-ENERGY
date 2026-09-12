import React from 'react';
import { ArrowUp, Mail, Linkedin, MapPin } from 'lucide-react';
import { DecaLogo } from './DecaLogo';
import { TranslationContent } from '../types';

interface FooterProps {
  content: TranslationContent['footer'];
  founderContent: TranslationContent['founder'];
  lang?: 'sv' | 'en';
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  content,
  founderContent,
  lang = 'sv',
  onNavigate,
}) => {
  const isEn = lang === 'en';
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#020b12] text-neutral-400 border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/10">
          {/* Col 1: Brand & Slogan */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <DecaLogo size="sm" alt="DECA Energy Consulting AB" />
            </div>
            <p className="text-base text-white font-medium max-w-sm font-sans">
              {content.tagline}
            </p>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-md">
              {isEn
                ? 'Independent technical and commercial advisory within utility-scale solar PV and battery storage (BESS) for the Nordic and European markets.'
                : 'Oberoende teknisk och kommersiell rådgivning inom storskalig solenergi (PV) och batterilagring (BESS) för den nordiska och europeiska marknaden.'}
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              {isEn ? 'Navigation' : 'Navigation'}
            </h4>
            <ul className="space-y-1.5 text-sm">
              {content.links.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(link.href.replace('#', ''));
                    }}
                    className="hover:text-emerald-400 transition-colors inline-flex items-center py-1.5 min-h-[36px]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              {isEn ? 'Contact & Scope' : 'Kontakt & Verksamhet'}
            </h4>
            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex items-center gap-2 text-neutral-300">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <a
                  href={`mailto:${founderContent.email}`}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {founderContent.email}
                </a>
              </div>

              <div className="flex items-center gap-2 text-neutral-300">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{content.location || founderContent.location}</span>
              </div>

              <div className="flex items-center gap-2 text-neutral-300 pt-1">
                <Linkedin className="w-3.5 h-3.5 text-emerald-400" />
                <a
                  href={founderContent.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  linkedin.com/in/danieldesidera
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="text-neutral-500 text-center sm:text-left">
            {content.rights}
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-emerald-400 transition-colors cursor-pointer"
          >
            <span>{content.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
