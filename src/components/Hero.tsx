import React from 'react';
import { MoveRight } from 'lucide-react';
import { TranslationContent } from '../types';
import worldMapImg from '../assets/home.world-map.jpg';

interface HeroProps {
  content: TranslationContent['hero'];
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ content, onNavigate }) => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-map-background">
        <img
          data-image-slot="home.world-map"
          src={worldMapImg}
          alt="World map with luminous energy connections"
          width="1440"
          height="560"
        />
      </div>
      <div className="hero-content shell">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-line" />
            {content.eyebrow}
          </div>
          <h1 aria-label={`${content.titleStart} ${content.titleAccent}`}>
            {content.titleStart} <em>{content.titleAccent}</em>
          </h1>
          <p className="hero-body">
            {content.body}
          </p>
          <div className="hero-actions">
            <button
              type="button"
              onClick={() => onNavigate('services')}
              className="button button-primary"
            >
              {content.primaryCta}
              <MoveRight size={18} />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="button button-ghost"
            >
              {content.secondaryCta}
            </button>
          </div>
          {content.note ? (
            <p className="hero-note">{content.note}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
};
