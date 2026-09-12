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
    <footer className="bg-[#020b12] text-neutral-400 border-t border-white/10 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Main compact row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Slogan */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <DecaLogo size="sm" alt="DECA Energy Consulting AB" />
            <span className="hidden sm:inline text-white/20">|</span>
            <p className="text-xs text-neutral-300 font-medium">
              {content.tagline}
            </p>
          </div>

          {/* Navigation Links (inline) */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono">
              {content.links.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(link.href.replace('#', ''));
                    }}
                    className="hover:text-emerald-400 transition-colors text-neutral-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Quick Contact & Social */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <a
              href={`mailto:${founderContent.email}`}
              className="hover:text-emerald-400 text-neutral-300 transition-colors inline-flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>{founderContent.email}</span>
            </a>
            <a
              href={founderContent.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-emerald-400 text-neutral-400 hover:text-white transition-colors"
            >
              <Linkedin className="w-4 h-4 text-emerald-400" />
            </a>
          </div>
        </div>

        {/* Divider & Bottom bar */}
        <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-neutral-500">
          <div>{content.rights}</div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 text-neutral-400 hover:text-emerald-400 transition-colors cursor-pointer"
          >
            <span>{content.backToTop}</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};
