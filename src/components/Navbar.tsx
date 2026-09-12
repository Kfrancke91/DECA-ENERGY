import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { DecaLogo } from './DecaLogo';
import { Language, TranslationContent } from '../types';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  content: TranslationContent['nav'];
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageChange,
  content,
  onNavigate,
  activeSection,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: content.home },
    { id: 'about', label: content.about },
    { id: 'services', label: content.services },
    { id: 'contact', label: content.contact },
  ];

  const handleLinkClick = (id: string) => {
    setMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07131e]/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20 py-3.5'
          : 'bg-[#07131e]/80 backdrop-blur-sm border-b border-white/5 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('home');
            }}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-md p-1 -ml-1"
            aria-label="DECA Desidera Energy Consulting Agency AB"
          >
            <DecaLogo size="sm" alt="DECA Desidera Energy Consulting Agency AB" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <nav aria-label="Main Navigation" className="flex items-center gap-7 text-sm font-medium">
              {navLinks.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.id);
                    }}
                    className={`relative py-1 transition-colors duration-200 ${
                      isActive
                        ? 'text-emerald-400 font-semibold'
                        : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
                    )}
                  </a>
                );
              })}
            </nav>

            <div className="h-4 w-[1px] bg-white/15" aria-hidden="true" />

            {/* Language Switcher */}
            <div
              className="flex items-center bg-black/40 border border-white/10 rounded-full p-0.5 text-xs font-mono"
              role="group"
              aria-label="Language selector"
            >
              <button
                type="button"
                onClick={() => onLanguageChange('sv')}
                aria-pressed={lang === 'sv'}
                className={`px-3 py-1.5 rounded-full transition-all duration-150 cursor-pointer ${
                  lang === 'sv'
                    ? 'bg-emerald-500 text-neutral-950 font-bold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                SV
              </button>
              <span className="text-white/20 select-none">/</span>
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                aria-pressed={lang === 'en'}
                className={`px-3 py-1.5 rounded-full transition-all duration-150 cursor-pointer ${
                  lang === 'en'
                    ? 'bg-emerald-500 text-neutral-950 font-bold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* CTA Button */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('contact');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-neutral-950 transition-all duration-150 shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/20 active:scale-95"
            >
              <span>{content.cta}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-3">
            {/* Mobile Language Switcher */}
            <div
              className="flex items-center bg-black/40 border border-white/10 rounded-full p-0.5 text-xs font-mono"
              role="group"
              aria-label="Language selector"
            >
              <button
                type="button"
                onClick={() => onLanguageChange('sv')}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                  lang === 'sv'
                    ? 'bg-emerald-500 text-neutral-950'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                SV
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                  lang === 'en'
                    ? 'bg-emerald-500 text-neutral-950'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              className="min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center rounded-xl border border-white/10 bg-white/5 text-neutral-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-white/10 bg-[#07131e]/98 backdrop-blur-xl ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0 border-b-0'
        }`}
      >
        <nav aria-label="Mobile Navigation" className="px-4 pt-3 pb-6 space-y-1">
          {navLinks.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(item.id);
              }}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                activeSection === item.id
                  ? 'bg-emerald-500/10 text-emerald-400 font-semibold'
                  : 'text-neutral-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3 px-4">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('contact');
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-semibold text-sm transition-colors shadow-lg shadow-emerald-500/10"
            >
              <span>{content.cta}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};
