import React, { useState, useEffect } from 'react';
import {
  Mail,
  Linkedin,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { Language, TranslationContent } from '../types';

interface ContactSectionProps {
  content: TranslationContent['contact'];
  founderContent: TranslationContent['founder'];
  selectedServiceId: string | null;
  lang?: Language;
  staticFormsEndpoint?: string;
  staticFormsApiKey?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  content,
  founderContent,
  selectedServiceId,
  lang = 'sv',
  staticFormsEndpoint = 'https://api.staticforms.dev/submit',
  staticFormsApiKey = 'sf_4b21c100a5b3c4b1970d636a',
}) => {
  const isEn = lang === 'en';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'all',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverErrorMessage, setServerErrorMessage] = useState('');

  // Sync selected service if changed from external clicks
  useEffect(() => {
    if (selectedServiceId) {
      setFormData((prev) => ({ ...prev, service: selectedServiceId }));
    }
  }, [selectedServiceId]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = isEn ? 'Please enter your name' : 'Vänligen ange ditt namn';
    }
    if (!formData.email.trim()) {
      errs.email = isEn ? 'Please enter your email address' : 'Vänligen ange din e-postadress';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = isEn ? 'Invalid email address format' : 'Ogiltigt format på e-postadress';
    }
    if (!formData.message.trim()) {
      errs.message = isEn ? 'Please write a message' : 'Vänligen skriv ett meddelande';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setServerErrorMessage('');

    try {
      const fullMessage = [
        formData.company ? `Företag / Company: ${formData.company}` : '',
        formData.service && formData.service !== 'all' ? `Område / Service: ${formData.service}` : '',
        '',
        'Meddelande / Message:',
        formData.message,
      ]
        .filter(Boolean)
        .join('\n');

      const response = await fetch(staticFormsEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          apiKey: staticFormsApiKey,
          subject: 'Daniel Desidera submission',
          name: formData.name,
          email: formData.email,
          message: fullMessage,
          honeypot: '',
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success !== false) {
        setStatus('success');
      } else {
        console.warn('StaticForms response not OK:', data);
        setStatus('error');
        setServerErrorMessage(data.message || content.form.errorMessage);
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      // Fallback: If network failed or endpoint blocked in iframe, allow user to send via mailto
      setStatus('error');
      setServerErrorMessage(content.form.errorMessage);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      service: 'all',
      message: '',
    });
    setErrors({});
    setStatus('idle');
  };

  const mailtoFallbackUrl = `mailto:daniel@deca-energy.com?subject=${encodeURIComponent(
    `DECA Energy Inquiry - ${formData.company || formData.name}`
  )}&body=${encodeURIComponent(
    `Namn: ${formData.name}\nE-post: ${formData.email}\nFöretag: ${formData.company}\nTjänst: ${formData.service}\n\nMeddelande:\n${formData.message}`
  )}`;

  return (
    <section id="contact" className="py-14 sm:py-28 bg-[#03111c] text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{content.eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 sm:mb-6 leading-tight">
            {content.title}
          </h2>
          <p className="text-base sm:text-xl text-neutral-300 font-sans leading-relaxed">
            {content.body}
          </p>
        </div>

        {/* 2-Column Corporate Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left Column: Direct Contact & Founder Credentials */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div className="p-5 sm:p-8 rounded-3xl bg-[#071e2b] border border-white/10 shadow-xl space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {content.directTitle}
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {content.directDesc}
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {/* Email Item */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-emerald-500/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-mono text-neutral-400 uppercase">
                      {content.emailLabel}
                    </div>
                    <a
                      href="mailto:daniel@deca-energy.com"
                      className="text-base font-semibold text-emerald-400 hover:text-emerald-300 transition-colors truncate block"
                    >
                      daniel@deca-energy.com
                    </a>
                    <span className="text-xs text-neutral-400">
                      Daniel Desidera • Founder
                    </span>
                  </div>
                </div>

                {/* Location Item */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-emerald-500/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-mono text-neutral-400 uppercase">
                      {content.locationLabel}
                    </div>
                    <div className="text-base font-semibold text-white">
                      {founderContent.location}
                    </div>
                  </div>
                </div>

                {/* LinkedIn Link (with clickable hyperlink as requested) */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-emerald-500/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-mono text-neutral-400 uppercase">
                      LinkedIn
                    </div>
                    <a
                      href="https://www.linkedin.com/in/danieldesidera"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-base font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      <span>linkedin.com/in/danieldesidera</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                    <span className="text-xs text-neutral-400 block">
                      {isEn ? 'Connect for international dialogue' : 'Connecta för internationell dialog'}
                    </span>
                  </div>
                </div>
              </div>

              {/* SLA Response Note */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-neutral-400 font-mono">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {isEn
                    ? 'We respond to all serious inquiries within 24 hours.'
                    : 'Vi besvarar alla seriösa förfrågningar inom 24 timmar.'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: StaticForms Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-5 sm:p-10 rounded-3xl bg-[#092232] border border-white/15 shadow-2xl relative">
              {status === 'success' ? (
                /* Success State */
                <div className="py-12 px-4 text-center space-y-6 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="max-w-md mx-auto space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {content.form.successTitle}
                    </h3>
                    <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                      {content.form.successBody}
                    </p>
                    <p className="text-xs font-mono text-emerald-400 pt-2">
                      {isEn
                        ? 'A copy is sent to daniel@deca-energy.com'
                        : 'Kopia skickas till daniel@deca-energy.com'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition-colors cursor-pointer"
                  >
                    {content.form.sendAnother}
                  </button>
                </div>
              ) : (
                /* Form StaticForms */
                <form
                  action={staticFormsEndpoint}
                  method="POST"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <input type="hidden" name="apiKey" value={staticFormsApiKey} />
                  <input type="hidden" name="subject" value="Daniel Desidera submission" />
                  <input
                    type="text"
                    name="honeypot"
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                  <div>
                    <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-1">
                      {content.form.eyebrow}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {content.form.title}
                    </h3>
                    <p className="text-sm text-neutral-300 mt-1">
                      {content.form.body}
                    </p>
                  </div>

                  {status === 'error' && (
                    <div className="p-4 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-200 text-sm space-y-2">
                      <div className="flex items-center gap-2 font-semibold">
                        <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                        <span>{serverErrorMessage || content.form.errorMessage}</span>
                      </div>
                      <p className="text-xs text-red-300">
                        Klicka nedan för att skicka ditt meddelande direkt via din e-postklient:
                      </p>
                      <a
                        href={mailtoFallbackUrl}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-800 hover:bg-red-700 text-white font-bold text-xs"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Skicka direkt till daniel@deca-energy.com</span>
                      </a>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-mono font-semibold text-neutral-300 mb-2 uppercase"
                      >
                        {content.form.nameLabel}
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all ${
                          errors.name
                            ? 'border-red-400 focus:ring-red-400'
                            : 'border-white/10 hover:border-white/20'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-400 mt-1 font-sans">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-mono font-semibold text-neutral-300 mb-2 uppercase"
                      >
                        {content.form.emailLabel}
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all ${
                          errors.email
                            ? 'border-red-400 focus:ring-red-400'
                            : 'border-white/10 hover:border-white/20'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-400 mt-1 font-sans">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Company */}
                    <div>
                      <label
                        htmlFor="contact-company"
                        className="block text-xs font-mono font-semibold text-neutral-300 mb-2 uppercase"
                      >
                        {content.form.companyLabel}
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 hover:border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
                      />
                    </div>

                    {/* Service of Interest */}
                    <div>
                      <label
                        htmlFor="contact-service"
                        className="block text-xs font-mono font-semibold text-neutral-300 mb-2 uppercase"
                      >
                        {content.form.serviceLabel}
                      </label>
                      <select
                        id="contact-service"
                        name="service"
                        value={formData.service}
                        onChange={(e) =>
                          setFormData({ ...formData, service: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 hover:border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all cursor-pointer"
                      >
                        {content.form.serviceOptions.map((opt) => (
                          <option
                            key={opt.id}
                            value={opt.id}
                            className="bg-[#081724] text-white py-2"
                          >
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-mono font-semibold text-neutral-300 mb-2 uppercase"
                    >
                      {content.form.messageLabel}
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all resize-y min-h-[110px] ${
                        errors.message
                          ? 'border-red-400 focus:ring-red-400'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-400 mt-1 font-sans">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-base transition-all duration-200 shadow-xl shadow-emerald-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {status === 'submitting' ? (
                        <>
                          <div className="w-5 h-5 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                          <span>{content.form.submittingBtn}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>{content.form.submitBtn}</span>
                        </>
                      )}
                    </button>
                    <p className="text-xs text-neutral-400 mt-3">
                      {content.form.directEmailNote}{' '}
                      <a
                        href="mailto:daniel@deca-energy.com"
                        className="text-emerald-400 hover:underline"
                      >
                        daniel@deca-energy.com
                      </a>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
