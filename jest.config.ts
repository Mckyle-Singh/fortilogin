import type { Config } from 'jest'
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
 
// Add any custom config to be passed to Jest
const config: Config = {
  collectCoverage: true, // Ensures Jest collects coverage
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  coverageDirectory: "coverage",
  coverageReporters: ["lcov", "text"],
  collectCoverageFrom: [
  "app/**/*.{js,ts,jsx,tsx}",
  "components/**/*.{js,ts,jsx,tsx}",
  "!**/node_modules/**",
  "!**/.next/**",
],

  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
