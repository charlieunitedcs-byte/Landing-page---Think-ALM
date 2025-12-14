// Google Analytics 4 Helper Functions

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

// Initialize GA4 with the measurement ID from environment
export const initGA4 = () => {
  const measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID;

  if (!measurementId || measurementId === '__GA4_MEASUREMENT_ID__') {
    console.warn('GA4 Measurement ID not configured. Analytics tracking disabled.');
    return;
  }

  // Replace placeholder in script tags
  const scripts = document.querySelectorAll('script');
  scripts.forEach(script => {
    if (script.src && script.src.includes('__GA4_MEASUREMENT_ID__')) {
      script.src = script.src.replace('__GA4_MEASUREMENT_ID__', measurementId);
    }
    if (script.innerHTML && script.innerHTML.includes('__GA4_MEASUREMENT_ID__')) {
      script.innerHTML = script.innerHTML.replace(/__GA4_MEASUREMENT_ID__/g, measurementId);
    }
  });
};

// Track custom events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, parameters);
  } else {
    console.warn('Google Analytics not loaded. Event not tracked:', eventName, parameters);
  }
};

// Track CTA clicks
export const trackCTAClick = (ctaName: string, location: string) => {
  trackEvent('cta_click', {
    cta_name: ctaName,
    location: location,
  });
};

// Track section views
export const trackSectionView = (sectionName: string) => {
  trackEvent('section_view', {
    section_name: sectionName,
  });
};

// Track Calendly events
export const trackCalendlyOpened = (source: string) => {
  trackEvent('calendly_opened', {
    source: source,
  });
};

export const trackCalendlyScheduled = () => {
  trackEvent('calendly_scheduled', {
    event_category: 'conversion',
    value: 1,
  });
};

// Track "See Platform" clicks
export const trackSeePlatformClick = (location: string) => {
  trackEvent('see_platform_click', {
    location: location,
  });
};

// Track pricing section view
export const trackPricingViewed = () => {
  trackEvent('pricing_viewed', {
    event_category: 'engagement',
  });
};

// Scroll depth tracking
let scrollDepthTracked = {
  '25': false,
  '50': false,
  '75': false,
  '100': false,
};

export const trackScrollDepth = () => {
  const scrollPercentage = Math.round(
    ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100
  );

  Object.entries(scrollDepthTracked).forEach(([depth, tracked]) => {
    const depthNum = parseInt(depth);
    if (!tracked && scrollPercentage >= depthNum) {
      scrollDepthTracked[depth as keyof typeof scrollDepthTracked] = true;
      trackEvent('scroll_depth', {
        depth: depthNum,
      });
    }
  });
};

// Reset scroll depth tracking (useful for single-page apps)
export const resetScrollDepth = () => {
  scrollDepthTracked = {
    '25': false,
    '50': false,
    '75': false,
    '100': false,
  };
};
