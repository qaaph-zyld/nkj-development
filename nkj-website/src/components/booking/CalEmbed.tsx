'use client';

import { useEffect } from 'react';

export default function CalEmbed() {
  useEffect(() => {
    (function (C: any, A: string, L: string) {
      let p = function (a: any, ar: any) {
        a.q.push(ar);
      };
      let d = C.document;
      C.Cal =
        C.Cal ||
        function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement('script')).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api: any = function () {
              p(api, arguments);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            typeof namespace === 'string'
              ? (cal.ns[namespace] = cal.ns[namespace] || api)
              : p(cal, ar);
            return;
          }
          p(cal, ar);
        };
    })(window, 'https://app.cal.com/embed/embed.js', 'init');

    // Make sure 'qaaph-zyld-dpnueu/30min' matches your actual cal.com link!
    (window as any).Cal('init', '30min', { origin: 'https://cal.com' });

    (window as any).Cal.ns['30min']('ui', {
      styles: {
        branding: { brandColor: '#10b981' } // Emerald 500
      },
      hideEventTypeDetails: false,
      layout: 'month_view'
    });
  }, []);

  return (
    <div className="w-full min-h-[600px] bg-slate-950 rounded-xl overflow-hidden shadow-sm border border-slate-800">
      <div 
        style={{ width: '100%', height: '100%', overflow: 'hidden' }}
        id="my-cal-inline" 
      />
      
      {/* This is the div where Cal.com injects the calendar */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.Cal = window.Cal || function() { (window.Cal.q = window.Cal.q || []).push(arguments); };
            Cal('inline', {
              elementOrSelector: '#my-cal-inline',
              calLink: 'qaaph-zyld-dpnueu/30min', // Update with your actual Cal.com link
              layout: 'month_view'
            });
          `
        }}
      />
    </div>
  );
}
