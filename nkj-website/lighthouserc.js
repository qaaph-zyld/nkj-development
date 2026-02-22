module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm start',
      startServerReadyPattern: 'ready on',
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/about',
        'http://localhost:3000/demo/oee-calculator'
      ],
      numberOfRuns: 3
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['error', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.85 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        // Next.js dev server/build environment specific relaxations
        'unused-javascript': 'warn',
        'unused-css-rules': 'warn',
        'non-composited-animations': 'warn',
        'errors-in-console': 'warn'
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};
