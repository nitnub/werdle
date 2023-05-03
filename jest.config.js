const config = {
  preset: 'jest-puppeteer',
  globals: { URL: process.env.URL },
  verbose: false,
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};

export default config;