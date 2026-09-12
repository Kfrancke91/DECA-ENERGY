import React, { useEffect } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Mail,
  Linkedin,
  MapPin,
  ArrowUpRight,
  Sparkles,
  Download,
  Layers,
  ArrowRight,
  ShieldCheck,
  Globe2,
} from 'lucide-react';
import { Language, TranslationContent } from '../types';

interface AboutPageProps {
  content: TranslationContent['proof'];
  founderContent: TranslationContent['founder'];
  lang?: Language;
  onNavigate: (sectionId: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  content,
  founderContent,
  lang = 'sv',
  onNavigate,
}) => {
  const isEn = lang === 'en';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleDownloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
N:Desidera;Daniel;;;
FN:Daniel Desidera
EMAIL;TYPE=INTERNET,PREF:daniel@deca-energy.com
URL:https://deca-energy.com
URL;TYPE=LinkedIn:https://www.linkedin.com/in/danieldesidera
ADR;TYPE=WORK:;;;Sverige;;;Sweden
NOTE:Specialist within PV & BESS energy solutions
END:VCARD`;
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Daniel_Desidera_DECA.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pb-10 sm:pb-12 bg-[#f8faf8] text-[#0c1a21] min-h-screen">
      {/* Top Banner & Header */}
      <div className="bg-[#03111c] text-white pt-28 sm:pt-36 pb-14 sm:pb-20 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/40 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back to Home Button */}
          <div className="mb-6">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>{isEn ? 'Back to home' : 'Tillbaka till startsidan'}</span>
            </button>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{content.eyebrow}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              {content.title}
            </h1>
            <p className="text-base sm:text-xl text-neutral-300 font-sans leading-relaxed">
              {content.body}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
        {/* Editorial Split: 01 Position vs 02 How We Work */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-14 sm:mb-24">
          {/* Card 01 / Position (Dark Card) */}
          <div className="lg:col-span-5 rounded-3xl bg-[#071e2b] text-white p-5 sm:p-10 flex flex-col justify-between shadow-xl border border-[#0e3043] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="inline-block text-xs font-mono font-bold tracking-widest text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30 mb-5 sm:mb-6">
                {content.positionTag}
              </div>
              <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-white mb-4 sm:mb-6 leading-snug">
                {content.positionTitle}
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-6 sm:mb-8">
                {content.positionBody}
              </p>
            </div>

            <div className="pt-5 sm:pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                DECA Energy
              </span>
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
              >
                <span>{isEn ? 'Contact' : 'Kontakt'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 02 / How We Work (Core Capabilities) */}
          <div className="lg:col-span-7 rounded-3xl bg-white p-5 sm:p-10 shadow-lg shadow-black/5 border border-neutral-200/80 flex flex-col justify-between">
            <div>
              <div className="inline-block text-xs font-mono font-bold tracking-widest text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200 mb-5 sm:mb-6">
                {content.methodTag}
              </div>
              <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-[#03111c] mb-4 sm:mb-6">
                {content.methodTitle}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 mb-6">
                {content.points.map((point, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 sm:p-3.5 rounded-xl bg-[#f7faf7] border border-neutral-200/60 hover:border-emerald-400/50 hover:bg-emerald-50/40 transition-all duration-150"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-neutral-800 leading-snug">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between text-xs text-neutral-500 font-mono border-t border-neutral-100">
              <div className="flex items-center gap-1.5">
                <Globe2 className="w-4 h-4 text-emerald-600" />
                <span>{isEn ? 'Around Europe' : 'Runt om i Europa'}</span>
              </div>
              <span className="text-emerald-700 font-bold">
                {isEn ? '7 Core Pillars' : '7 Kärnområden'}
              </span>
            </div>
          </div>
        </div>

        {/* 3 Strategic Pillars Grid */}
        <div className="mb-14 sm:mb-24">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#03111c] tracking-tight">
              {content.capabilitiesHeading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
            {content.capabilities.map((cap, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/90 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-600 mb-3 sm:mb-4 opacity-75 group-hover:opacity-100 transition-opacity">
                  {cap.num}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#03111c] mb-2.5 sm:mb-3 tracking-tight">
                  {cap.title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership & Founder Spotlight Card */}
        <div className="rounded-3xl bg-gradient-to-br from-[#071e2b] via-[#0a2738] to-[#041520] text-white p-5 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden mb-14 sm:mb-24">
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
            <div className="space-y-4 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono border border-emerald-500/30">
                <span>{founderContent.eyebrow}</span>
              </div>
              <div>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-1">
                  {founderContent.name}
                </h2>
                <p className="text-emerald-400 font-mono text-sm sm:text-base font-medium">
                  {founderContent.role}
                </p>
                <p className="text-xs font-mono text-neutral-400 mt-0.5">
                  {founderContent.company}
                </p>
              </div>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                {founderContent.bio}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-300 pt-2">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{founderContent.location}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full sm:w-auto shrink-0">
              <a
                href={`mailto:${founderContent.email}`}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm transition-all duration-150 shadow-lg shadow-emerald-500/20 active:scale-95 min-h-[44px]"
              >
                <Mail className="w-4 h-4" />
                <span>{founderContent.email}</span>
              </a>

              <a
                href={founderContent.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/15 font-semibold text-sm transition-all duration-150 hover:border-white/25 active:scale-95 min-h-[44px]"
              >
                <Linkedin className="w-4 h-4 text-emerald-400" />
                <span>{isEn ? 'LinkedIn Profile' : 'LinkedIn Profil'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={handleDownloadVCard}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-transparent hover:bg-white/5 text-neutral-300 hover:text-white border border-white/10 text-xs font-mono transition-colors cursor-pointer min-h-[40px]"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span>{founderContent.vcardLabel}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Navigation / CTA Card */}
        <div className="rounded-3xl bg-[#03111c] text-white p-5 sm:p-12 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isEn ? 'Independent Advisory' : 'Oberoende Rådgivning'}</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-extrabold tracking-tight mb-3 sm:mb-4">
              {isEn
                ? 'Interested in collaborating or discussing an energy project?'
                : 'Vill du utforska ett samarbete eller diskutera ett projekt?'}
            </h3>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6 font-sans">
              {isEn
                ? 'Whether you require product agency representation, grid interconnection reviews, or Nordic & European market entrance advisory, we welcome your dialogue.'
                : 'Oavsett om det gäller produktförsäljning, nätanslutning eller etablering på den nordiska marknaden, är du varmt välkommen att höra av dig.'}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-sm transition-all duration-150 shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer min-h-[44px]"
              >
                <span>{isEn ? 'Contact Daniel Desidera' : 'Kontakta Daniel Desidera'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('services')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-all duration-150 cursor-pointer min-h-[44px]"
              >
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>{isEn ? 'Explore our services' : 'Se våra tjänster'}</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-transparent hover:bg-white/5 text-neutral-300 hover:text-white text-sm transition-colors cursor-pointer min-h-[44px]"
              >
                <span>{isEn ? 'Back to home' : 'Tillbaka till hem'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
