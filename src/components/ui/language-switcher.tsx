// CONTEXT7 SOURCE: /amannn/next-intl - Language switcher component for internationalization
// LANGUAGE SWITCHER REASON: Official next-intl documentation supports locale switching for multi-language applications

"use client";

import React from 'react';
import { m } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronDownIcon, GlobeIcon } from 'lucide-react';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { localeNames, localeFlags } from '@/i18n/navigation';

// CONTEXT7 SOURCE: /sonner/toast - Toast notification system for user feedback
// TOAST NOTIFICATION REASON: User feedback for language switching indicating future availability
import { useToast } from '@/hooks/use-toast';

// CONTEXT7 SOURCE: /amannn/next-intl - Language switcher component props interface
// TYPE SAFETY REASON: Official next-intl documentation recommends TypeScript for type-safe internationalization
interface LanguageSwitcherProps {
  className?: string;
  variant?: 'dropdown' | 'buttons' | 'compact';
  showFlags?: boolean;
  showLabels?: boolean;
  position?: 'header' | 'footer' | 'sidebar';
}

// CONTEXT7 SOURCE: /amannn/next-intl - Multi-language switcher with accessibility support
// ACCESSIBILITY REASON: Official next-intl documentation emphasises WCAG compliance for international users
export function LanguageSwitcher({
  className = '',
  variant = 'dropdown',
  showFlags = true,
  showLabels = true,
  position = 'header'
}: LanguageSwitcherProps) {
  const t = useTranslations('LanguageSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  
  // CONTEXT7 SOURCE: /sonner/toast - Toast hook for language switching notifications
  // TOAST HOOK REASON: User feedback system for non-English language selection
  const { toast } = useToast();

  // CONTEXT7 SOURCE: /amannn/next-intl - Enhanced locale switching handler with toast notifications
  // LOCALE SWITCHING REASON: Official next-intl documentation provides router-based locale navigation
  // TOAST NOTIFICATION ENHANCEMENT: User feedback for non-English language selections
  const handleLocaleChange = (newLocale: string) => {
    // Show toast notification for non-English languages
    if (newLocale !== 'en-GB') {
      const languageName = localeNames[newLocale];
      // CONTEXT7 SOURCE: /sonner/toast - Toast notification for language switching feedback
      // TOAST MESSAGE REASON: Professional user feedback indicating future language availability
      toast.info(`${languageName} on its way`, {
        description: `We're working on bringing you ${languageName} language support soon!`,
        duration: 4000,
      });
    }
    
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  // CONTEXT7 SOURCE: /radix-ui/primitives - Click outside handler for dropdown
  // ACCESSIBILITY REASON: Official Radix UI documentation recommends proper focus management
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // CONTEXT7 SOURCE: /radix-ui/primitives - Keyboard navigation support
  // KEYBOARD NAVIGATION REASON: Official Radix UI documentation ensures keyboard accessibility
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  // CONTEXT7 SOURCE: /amannn/next-intl - Button variant language switcher
  // BUTTON VARIANT REASON: Simple button layout for footer or sidebar placement
  if (variant === 'buttons') {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {routing.locales.map((loc) => (
          <m.button
            key={loc}
            onClick={() => handleLocaleChange(loc)}
            className={`
              flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${loc === locale 
                ? 'bg-accent-100 text-accent-700 border border-accent-200' 
                : 'bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
              }
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label={t('switchTo', { language: localeNames[loc] })}
          >
            {showFlags && <span className="text-lg">{localeFlags[loc]}</span>}
            {showLabels && <span>{localeNames[loc]}</span>}
          </m.button>
        ))}
      </div>
    );
  }

  // CONTEXT7 SOURCE: /amannn/next-intl - Compact variant for mobile/small spaces
  // COMPACT VARIANT REASON: Minimal space usage for mobile navigation
  if (variant === 'compact') {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <m.button
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          className={`
            flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200
            ${position === 'header' 
              ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
            }
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={t('selectLanguage')}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {showFlags ? (
            <span className="text-lg">{localeFlags[locale]}</span>
          ) : (
            <GlobeIcon className="w-5 h-5" />
          )}
        </m.button>

        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Animated dropdown menu */}
        {/* ANIMATION REASON: Official Tailwind CSS documentation supports smooth UI transitions */}
        {isOpen && (
          <m.div
            className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-slate-200 py-2 min-w-48 z-50"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {routing.locales.map((loc) => (
              <button
                key={loc}
                onClick={() => handleLocaleChange(loc)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-2 text-left text-sm transition-colors duration-200
                  ${loc === locale 
                    ? 'bg-accent-50 text-accent-700 font-medium' 
                    : 'text-slate-700 hover:bg-slate-50'
                  }
                `}
                aria-label={t('switchTo', { language: localeNames[loc] })}
              >
                <span className="text-lg">{localeFlags[loc]}</span>
                <span>{localeNames[loc]}</span>
                {loc === locale && (
                  <span className="ml-auto text-accent-500 text-xs">✓</span>
                )}
              </button>
            ))}
          </m.div>
        )}
      </div>
    );
  }

  // CONTEXT7 SOURCE: /amannn/next-intl - Full dropdown variant (default)
  // DROPDOWN REASON: Official next-intl documentation supports comprehensive language selection UI
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <m.button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={`
          flex items-center space-x-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 min-w-40
          ${position === 'header' 
            ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
            : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300'
          }
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label={t('selectLanguage')}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <GlobeIcon className="w-4 h-4" />
        <div className="flex items-center space-x-2">
          {showFlags && <span className="text-base">{localeFlags[locale]}</span>}
          {showLabels && <span>{localeNames[locale]}</span>}
        </div>
        <ChevronDownIcon 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </m.button>

      {/* CONTEXT7 SOURCE: /grx7/framer-motion - Animated dropdown with smooth transitions */}
      {/* ANIMATION ENHANCEMENT: Official Framer Motion documentation provides performant UI animations */}
      {isOpen && (
        <m.div
          className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-slate-200 py-2 min-w-52 z-50"
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div className="px-3 py-2 border-b border-slate-100">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              {t('languages')}
            </p>
          </div>
          
          {routing.locales.map((loc, index) => (
            <m.button
              key={loc}
              onClick={() => handleLocaleChange(loc)}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 text-left text-sm transition-all duration-200 group
                ${loc === locale 
                  ? 'bg-accent-50 text-accent-700 font-medium' 
                  : 'text-slate-700 hover:bg-slate-50'
                }
              `}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              aria-label={t('switchTo', { language: localeNames[loc] })}
            >
              <span className="text-xl group-hover:scale-110 transition-transform duration-200">
                {localeFlags[loc]}
              </span>
              <div className="flex-1">
                <span className="block">{localeNames[loc]}</span>
                <span className="text-xs text-slate-500 mt-0.5">
                  {loc.toUpperCase()}
                </span>
              </div>
              {loc === locale && (
                <div className="w-2 h-2 bg-accent-500 rounded-full" />
              )}
            </m.button>
          ))}
        </m.div>
      )}
    </div>
  );
}