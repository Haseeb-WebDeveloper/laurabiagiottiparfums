declare global {
    interface Window {
      PiwikProConsentManager: {
        showBanner: () => void;
      };
    }
  }