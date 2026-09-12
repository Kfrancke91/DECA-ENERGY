export type Language = 'sv' | 'en';

export interface ServiceOffer {
  id: string;
  tag: string;
  kicker: string;
  category: string;
  title: string;
  subtitle: string;
  body: string;
  fullDescription?: string;
  bullets: string[];
  deliverables?: string[];
  imagePath: string;
  alt: string;
  ctaText: string;
  spriteIndex: number;
}

export interface ProofPoint {
  title: string;
  description: string;
}

export interface TranslationContent {
  nav: {
    home: string;
    about: string;
    services: string;
    contact: string;
    tagline: string;
    cta: string;
  };
  hero: {
    eyebrow: string;
    titleStart: string;
    titleAccent: string;
    tagline: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
    note: string;
    stats: {
      value: string;
      label: string;
    }[];
  };
  proof: {
    eyebrow: string;
    title: string;
    body: string;
    positionTag: string;
    positionTitle: string;
    positionBody: string;
    methodTag: string;
    methodTitle: string;
    points: string[];
    capabilitiesHeading: string;
    capabilities: {
      num: string;
      title: string;
      desc: string;
    }[];
  };
  founder: {
    eyebrow: string;
    title: string;
    name: string;
    role: string;
    company: string;
    bio: string;
    location: string;
    email: string;
    phone?: string;
    linkedin: string;
    website: string;
    vcardLabel: string;
  };
  services: {
    eyebrow: string;
    title: string;
    intro: string;
    browseAll: string;
    viewDetails: string;
    inquireService: string;
    deliverablesLabel?: string;
    items: ServiceOffer[];
  };
  contact: {
    eyebrow: string;
    title: string;
    body: string;
    directTitle: string;
    directDesc: string;
    emailLabel: string;
    locationLabel: string;
    form: {
      eyebrow: string;
      title: string;
      body: string;
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      companyLabel: string;
      companyPlaceholder: string;
      serviceLabel: string;
      serviceOptions: { id: string; label: string }[];
      messageLabel: string;
      messagePlaceholder: string;
      submitBtn: string;
      submittingBtn: string;
      successTitle: string;
      successBody: string;
      errorMessage: string;
      sendAnother: string;
      directEmailNote: string;
    };
  };
  footer: {
    tagline: string;
    company: string;
    rights: string;
    location: string;
    backToTop: string;
    links: { label: string; href: string }[];
  };
}
