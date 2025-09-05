import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    root: './',
    globals: true,
    setupFiles: ['test-setup.ts'],
    environment: 'jsdom',
    watch: true,
    reporters: ['default'],
    coverage: {
      enabled: true,
      provider: 'v8',
      all: true,
      reportsDirectory: 'coverage',
      reporter: ['text', 'text-summary', 'html', 'lcov'],
      excludeAfterRemap: true,
      exclude: [
        '**/*.{test,spec}.?(c|m)ts',
        'src/main.ts',
        'src/environments/**',
        '**/__mocks__/**'
      ],
      thresholds: { lines: 80, branches: 70, functions: 80, statements: 80 },
    },
  },
  plugins: [
    {
      name: 'angular-coverage-exclude',
      configureVitest(context) {
        // append instead of overwrite (so your manual excludes stay)
        const current = context.project.config.coverage?.exclude ?? [];
        context.project.config.coverage.exclude = [
          ...current,
          '**/*.{test,spec}.?(c|m)ts'
        ];
      }
    }
  ]
});

