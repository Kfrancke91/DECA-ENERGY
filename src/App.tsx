import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutPage } from './components/AboutPage';
import { ServicesOverview } from './components/ServicesOverview';
import { ServicesPage } from './components/ServicesPage';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { translations } from './data/translations';
import { Language, ServiceOffer } from './types';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('deca_lang');
    return saved === 'en' || saved === 'sv' ? saved : 'sv';
  });

  // View state: 'home', 'about', or 'services'
  const [view, setView] = useState<'home' | 'about' | 'services'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'about') return 'about';
      if (hash === 'services' || hash.startsWith('offer-')) return 'services';
    }
    return 'home';
  });

  const [activeSection, setActiveSection] = useState<string>('home');
  const [targetServiceId, setTargetServiceId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('offer-')) return hash;
    }
    return null;
  });

  const [modalService, setModalService] = useState<ServiceOffer | null>(null);
  const [inquiryServiceId, setInquiryServiceId] = useState<string | null>(null);

  const t = translations[lang];

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('deca_lang', newLang);
  };

  const handleNavigate = (target: string) => {
    const cleanTarget = target.replace('#', '');

    // Navigating to dedicated About page
    if (cleanTarget === 'about') {
      setView('about');
      try {
        window.history.pushState(null, '', '#about');
      } catch {
        window.location.hash = 'about';
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Navigating to dedicated Services page
    if (cleanTarget === 'services' || cleanTarget.startsWith('offer-')) {
      setView('services');
      if (cleanTarget.startsWith('offer-')) {
        setTargetServiceId(cleanTarget);
      } else {
        setTargetServiceId(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      try {
        window.history.pushState(null, '', `#${cleanTarget}`);
      } catch {
        window.location.hash = cleanTarget;
      }
      return;
    }

    // Navigating to a section on the home page (home, contact)
    if (view !== 'home') {
      setView('home');
      try {
        window.history.pushState(null, '', cleanTarget === 'home' ? '#' : `#${cleanTarget}`);
      } catch {
        window.location.hash = cleanTarget;
      }
      setTimeout(() => {
        if (cleanTarget === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.getElementById(cleanTarget);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 70);
      return;
    }

    // Already on home page
    if (cleanTarget === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(cleanTarget);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    try {
      window.history.pushState(null, '', `#${cleanTarget}`);
    } catch {
      window.location.hash = cleanTarget;
    }
  };

  const handleInquireService = (serviceId: string) => {
    setInquiryServiceId(serviceId);
    handleNavigate('contact');
  };

  // Sync with browser Back/Forward navigation
  useEffect(() => {
    const handleHashOrPop = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'about') {
        setView('about');
      } else if (hash === 'services' || hash.startsWith('offer-')) {
        setView('services');
        if (hash.startsWith('offer-')) {
          setTargetServiceId(hash);
        }
      } else {
        setView('home');
      }
    };

    window.addEventListener('popstate', handleHashOrPop);
    window.addEventListener('hashchange', handleHashOrPop);
    return () => {
      window.removeEventListener('popstate', handleHashOrPop);
      window.removeEventListener('hashchange', handleHashOrPop);
    };
  }, []);

  // Track active section on scroll when on home view
  useEffect(() => {
    if (view === 'about') {
      setActiveSection('about');
      return;
    }
    if (view === 'services') {
      setActiveSection('services');
      return;
    }

    const sectionIds = ['contact', 'services-overview', 'home'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          if (id === 'services-overview') {
            setActiveSection('services');
          } else {
            setActiveSection(id);
          }
          return;
        }
      }
      setActiveSection('home');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [view]);

  return (
    <div className="min-h-screen bg-[#03111c] text-[#f7faf7] flex flex-col font-sans selection:bg-emerald-400 selection:text-neutral-950">
      {/* Sticky Navigation */}
      <Navbar
        lang={lang}
        onLanguageChange={handleLanguageChange}
        content={t.nav}
        onNavigate={handleNavigate}
        activeSection={view === 'about' ? 'about' : view === 'services' ? 'services' : activeSection}
      />

      <main className="flex-grow">
        {view === 'home' && (
          /* ==========================================================
             MAIN / HOME PAGE
             Focused, clean flow: Hero -> Services Overview -> Contact
             ========================================================== */
          <>
            {/* 1. Hero Section */}
            <Hero content={t.hero} onNavigate={handleNavigate} />

            {/* 2. Services Visual Overview Bar (Links to separate Services Page) */}
            <ServicesOverview
              content={t.services}
              lang={lang}
              onSelectService={(srv) => setModalService(srv)}
              onOpenServices={(srvId) => handleNavigate(srvId || 'services')}
            />

            {/* 3. Contact Section with StaticForms */}
            <ContactSection
              content={t.contact}
              founderContent={t.founder}
              selectedServiceId={inquiryServiceId}
              lang={lang}
            />
          </>
        )}

        {view === 'about' && (
          /* ==========================================================
             DEDICATED ABOUT PAGE
             Full leadership story, 7 capabilities, 3 pillars, vCard
             ========================================================== */
          <AboutPage
            content={t.proof}
            founderContent={t.founder}
            lang={lang}
            onNavigate={handleNavigate}
          />
        )}

        {view === 'services' && (
          /* ==========================================================
             DEDICATED SERVICES PAGE
             Full editorial deep-dive with deliverables, CAD/SLD, and focus areas
             ========================================================== */
          <ServicesPage
            content={t.services}
            lang={lang}
            onSelectService={(srv) => setModalService(srv)}
            onInquire={handleInquireService}
            onNavigateHome={(sectionId) => handleNavigate(sectionId || 'home')}
            targetServiceId={targetServiceId}
          />
        )}
      </main>

      {/* Corporate Footer */}
      <Footer
        content={t.footer}
        founderContent={t.founder}
        lang={lang}
        onNavigate={handleNavigate}
      />

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={modalService}
        lang={lang}
        onClose={() => setModalService(null)}
        onInquire={handleInquireService}
      />
    </div>
  );
}
