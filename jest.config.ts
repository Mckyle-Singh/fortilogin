/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  preset: "ts-jest", // Ensures Jest works with TypeScript
  testEnvironment: "node", // Uses Node.js for testing
  collectCoverage: true, // Enables test coverage collection
  coverageDirectory: "coverage", // Defines where coverage reports are stored
  coverageReporters: ["lcov", "text"], // Generates an lcov.info file
};

export default config;

