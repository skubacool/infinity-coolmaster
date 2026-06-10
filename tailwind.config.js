/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ---- Infinity CoolMaster corporate tokens ----
        'bg-base': '#FFFFFF',
        'bg-soft': '#F8FAFC', // slate-50 — secondary surfaces
        'text-main': '#0F172A', // deep corporate navy
        'text-muted': '#475569', // slate-600 — secondary copy
        'brand-green': '#10B981', // energy savings / sustainability
        'brand-blue': '#38BDF8', // chilled water / cooling dynamics
        'brand-green-soft': '#ECFDF5',
        'brand-blue-soft': '#F0F9FF',
        navy: '#0F172A',
        'navy-800': '#1E293B',

        // Translucent helpers
        'navy-a70': 'rgba(15, 23, 42, .7)',
        'navy-a50': 'rgba(15, 23, 42, .5)',
        'navy-a30': 'rgba(15, 23, 42, .3)',
        'white-a10': 'rgba(255, 255, 255, .1)',
        'white-a20': 'rgba(255, 255, 255, .2)',
        'white-a30': 'rgba(255, 255, 255, .3)',
        'white-a70': 'rgba(255, 255, 255, .7)',
        'white-a80': 'rgba(255, 255, 255, .8)',
        'green-a10': 'rgba(16, 185, 129, .1)',
        'blue-a10': 'rgba(56, 189, 248, .1)',

        // Neutral separators / supporting grays (bright palette)
        'sep-pale': '#F1F5F9',
        'sep-light': '#E2E8F0',
        'sep-smoke': '#CBD5E1',
        'title-pale': '#94A3B8',
        'title-light': '#64748B',
        pale: '#F8FAFC',
        'date-light': '#94A3B8',
      },
      backgroundImage: {
        // Signature gradient mirroring the infinity-loop logo (green -> blue)
        'gradient-caas': 'linear-gradient(90deg, #10B981 0%, #38BDF8 100%)',
        'gradient-caas-soft':
          'linear-gradient(135deg, rgba(16,185,129,.08) 0%, rgba(56,189,248,.10) 100%)',
        'gradient-hero':
          'linear-gradient(160deg, #FFFFFF 0%, #F0F9FF 45%, #ECFDF5 100%)',
      },
      boxShadow: {
        premium: '0 1px 2px rgba(15, 23, 42, .04), 0 8px 24px rgba(15, 23, 42, .06)',
        'premium-md':
          '0 2px 4px rgba(15, 23, 42, .04), 0 12px 32px rgba(15, 23, 42, .08)',
      },
      fontSize: {
        '2xs': '.65rem',
        '2hxl': '1.75rem',
        '3hxl': '2rem',
        '4hxl': '2.5rem',
        '6hxl': '4rem',
      },
    },
  },
  plugins: [],
};
