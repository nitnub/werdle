module.exports = {
  preset: 'jest-puppeteer',
  globals: { URL: 'http://localhost:3000' },
  verbose: false,
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
