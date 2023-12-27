const { chromium } = require('playwright');

const DEV_HOST = process.env.DEV_HOST || '127.0.0.1';
const DEV_PORT = +(process.env.DEV_PORT || '5437');
const InstanceUrl = `http://${DEV_HOST}:${DEV_PORT}/suncase/`;

let browser;
let page;

beforeAll(async () => {
  browser = await chromium.launch();
});

afterAll(async () => {
  await browser.close();
});

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto(InstanceUrl);
});

afterEach(async () => {
  await page.close();
});

test('Add to cart', async () => {
  await page
    // s`some` will return '[data-test="some"]'
    .locator(`${s`product-card`} strong`)
    .filter({ hasText: 'Maui Jim' })
    .click();

  await page.locator(s`add-to-cart`).click();
  await page.locator(s`close-modal`).click();
  await page.locator(s`open-cart`).click();
  await page.locator(s`increment-item-counter`).click();

  const totalPrice = await (
    await page.locator(`${s`cart`} ${s`cart-total-price`}`)
  ).innerText();

  const cartLength = await (
    await page.locator(`${s`cart`} ${s`cart-length`}`)
  ).innerText();

  expect(totalPrice).toBe('$510');
  expect(cartLength).toBe('2');
}, 60000);

// Get selector
function s(s: TemplateStringsArray) {
  return `[data-test="${s}"]`;
}
