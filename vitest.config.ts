import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setupTests.ts'],
    alias: {
      '\\.svg$': path.resolve(__dirname, 'test/__mocks__/svgMock.tsx'),
    },
    include: ['test/**/*.test.{ts,tsx}'],
    exclude: ['node_modules', 'dist', 'test/templates'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.d.ts', 'src/**/index.ts'],
      reporter: ['html', 'lcov', 'text'],
      reportsDirectory: 'coverage',
    },
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
  },
})
