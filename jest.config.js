const baseDir = '<rootDir>/src';

const config = {
  preset: 'jest-puppeteer',
  testEnvironment: 'node',
  globals: { URL: process.env.TEST_URL },
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [`${baseDir}/**/*.js`, `${baseDir}/**/*.js`],
  coverageReporters: ['text'],
  setupFilesAfterEnv: [`@testing-library/jest-dom/extend-expect`],
  testMatch: [`${baseDir}/**/*.test.js`, `${baseDir}/**/*.test.js`],
};

module.exports = config;
