import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/Button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onBookDemo: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onBookDemo }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus the close button when menu opens
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key to close menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Focus trap implementation
  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const focusableElements = menuRef.current.querySelectorAll(
      'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  const handleNavClick = (sectionId: string) => {
    onClose();
    // Smooth scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookDemoClick = () => {
    onClose();
    onBookDemo();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="relative w-full max-w-md bg-dark-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          {/* Glass effect background */}
          <div className="absolute inset-0 bg-dark-850/90 backdrop-blur-xl" />

          <div className="relative z-10 p-8">
            {/* Close button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            {/* Logo */}
            <div className="mb-12 flex items-center gap-2">
              <div className="w-10 h-10 bg-brand-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(44,197,161,0.4)]">
                <svg className="w-6 h-6 text-dark-950 fill-current" viewBox="0 0 24 24">
                  <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"/>
                </svg>
              </div>
              <span className="font-bold text-2xl text-white">ThinkALM</span>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-4 mb-8">
              <a
                href="#platform"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('platform');
                }}
                className="block text-xl font-medium text-gray-300 hover:text-brand-500 transition-colors py-3 px-4 rounded-lg hover:bg-white/5"
              >
                Platform
              </a>
              <a
                href="#solutions"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('solutions');
                }}
                className="block text-xl font-medium text-gray-300 hover:text-brand-500 transition-colors py-3 px-4 rounded-lg hover:bg-white/5"
              >
                Solutions
              </a>
              <a
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('pricing');
                }}
                className="block text-xl font-medium text-gray-300 hover:text-brand-500 transition-colors py-3 px-4 rounded-lg hover:bg-white/5"
              >
                Pricing
              </a>
            </nav>

            {/* CTA Button */}
            <Button
              onClick={handleBookDemoClick}
              className="w-full"
              size="lg"
            >
              Book a Demo
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
