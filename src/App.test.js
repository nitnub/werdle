// import 'expect-puppeteer';
// import {render, screen} from '@testing-library/react' 
// import puppeteer from "puppeteer";
// import { toBeVisible } from '@testing-library/jest-dom';
// describe('Google', () => {
//   beforeAll(async () => {
//     await page.goto('https://google.com');
//   });

//   it('should display "google" text on page', async () => {
//     await expect(page).toMatch('google');
//   });
// });

// const timeout = 15000;
// beforeAll(async () => {
//   await page.goto(URL, { waitUntil: 'domcontentloaded' });
// });
// describe('Test page title and header', () => {
//   test(
//     'page title',
//     async () => {
//       const title = await page.title();
//       expect(title).toBe('Werdle');
//     } //,
//     // timeout
//   );
// });

beforeAll(async () => {
  await page.goto(URL, { waitUntil: 'domcontentloaded' });
});

describe('Page displays on load', () => {
  test('Page title is visible', async () => {
    const title = await page.title();
    expect(title).toBe('Werdle');
  });
  test('Header is visible', async () => {

    const contentHandler = await page.$('.content');
    const contentHandler2 = await page.$('.drawer-settings');

    expect(1).tooBe(1);
  });
  test('Settings bar is visible', async () => {
    const title = await page.title();
    expect(title).toBe('Werdle');
  });
  test('Game board is visible', async () => {
    const title = await page.title();
    expect(title).toBe('Werdle');
  });
  test('Keyboard is visible', async () => {
    const title = await page.title();
    expect(title).toBe('Werdle');
  });
});

describe('All elements display', () => {
  test('page title', async () => {
    const title = await page.title();
    expect(title).toBe('Werdle');
  });
});
