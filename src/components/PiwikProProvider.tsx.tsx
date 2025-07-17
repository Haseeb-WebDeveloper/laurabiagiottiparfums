'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import PiwikPro from '@piwikpro/react-piwik-pro';
import { PageViews } from '@piwikpro/react-piwik-pro';

export default function PiwikProProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // PIWIK PRO – Initialize once on mount
  useEffect(() => {
    console.log('Initializing PiwikPro...');
    PiwikPro.initialize(
      'd7b5497d-c6f0-4e89-b59b-0a9ea85212c0',
      'https://angelinibeauty.piwik.pro'
    );
    console.log('PiwikPro initialized');
  }, []);

  // PIWIK PRO – Track page views on route changes
  useEffect(() => {
    console.log('Tracking page view for:', pathname);
    PageViews.trackPageView();
  }, [pathname]);

  return <>{children}</>;
}