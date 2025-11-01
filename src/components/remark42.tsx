'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

import { env } from '@/env.mjs';

type Remark42Props = {
  host: string;
  siteId: string;
  url?: string;
  pageTitle?: string;
};

export const Remark42 = ({ host, siteId, url, pageTitle }: Remark42Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    // Only load if comments are enabled
    if (!env.NEXT_PUBLIC_ENABLE_COMMENTS) {
      return;
    }

    // Wait for the DOM to be ready and theme to be resolved
    if (!containerRef.current) return;

    // Configure Remark42
    const remark42Config = {
      host,
      site_id: siteId,
      components: ['embed'],
      url: url || window.location.href,
      theme: resolvedTheme === 'dark' ? 'dark' : 'light',
      ...(pageTitle && { page_title: pageTitle }),
    };

    // Add config to window
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).remark_config = remark42Config;

    // Load Remark42 script
    const script = document.createElement('script');
    script.src = `${host}/web/embed.js`;
    script.async = true;
    script.defer = true;

    // Cleanup function
    const cleanup = () => {
      // Remove Remark42 instance
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any).REMARK42) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).REMARK42.destroy();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (window as any).REMARK42;
      }
      // Remove config
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any).remark_config;
    };

    // Add script
    document.body.appendChild(script);

    return () => {
      cleanup();
      script.remove();
    };
  }, [host, siteId, url, pageTitle, resolvedTheme]);

  // Don't render if comments are disabled
  if (!env.NEXT_PUBLIC_ENABLE_COMMENTS) {
    return null;
  }

  return (
    <div className="mt-16 border-t pt-8">
      <div ref={containerRef} id="remark42" />
    </div>
  );
};
