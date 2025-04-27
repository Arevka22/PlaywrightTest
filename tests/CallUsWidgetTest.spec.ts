import { test, expect, Page } from '@playwright/test';
import { TestPage } from '../pages/TestPage';

let testPage: TestPage;

test.beforeEach(async ({ page }: { page: Page }) => {
  testPage = new TestPage(page);
  await testPage.navigateToPage();
});

test('"Call Us" button visibility check', async () => {
  await expect(testPage.callUsButton).toBeVisible();
});

test('Fill form with valid values check', async () => {
  await testPage.callUsButtonIsVisible();
  await testPage.clickCallUsButton();
  await expect(testPage.requestPopup).toBeVisible();
  await expect(testPage.requestPopupTitle).toBeVisible();

  await testPage.enterFirstName('John');
  await testPage.enterLastName('Doe');
  await testPage.enterCountryCode('MA (+212)');
  await testPage.enterPhoneNumber('123456789015');
  await expect(testPage.confirmationSignButton).toBeEnabled();
  await testPage.clickConfirmationButton();
  await expect(testPage.confirmationMsg).toBeVisible();

  await testPage.clickClosePopupButton();
  await expect(testPage.requestPopup).toBeHidden();
  await expect(testPage.callUsButton).toBeVisible();
});

test('UI page view check', async ({ page }) => {
  await expect(testPage.callUsButton).toBeVisible();
  await expect(page).toHaveScreenshot('page.png', {
    maxDiffPixelRatio: 0.1, // 10% difference allowed
  });
});