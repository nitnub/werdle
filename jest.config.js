const baseDir = '<rootDir>/src';
const focusDir = `${baseDir}/components/Keyboard/__tests__/Keyboard`;

const config = {
  preset: 'jest-puppeteer',
  testEnvironment: 'node',
  globals: { URL: process.env.TEST_URL },
  verbose: true,
  restoreMocks: true,
  collectCoverage: true,
  // collectCoverageFrom: [`${baseDir}/**/*.js`, `${baseDir}/**/*.js`],
  collectCoverageFrom: [`${focusDir}.js`],
  coverageReporters: ['text'],
  setupFilesAfterEnv: [`@testing-library/jest-dom/extend-expect`],
  // testMatch: [`${baseDir}/**/*.test.js`, `${baseDir}/**/*.test.js`],
  testMatch: [`${focusDir}.test.js`],
};

module.exports = config;
