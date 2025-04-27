import { test, expect, APIRequestContext, Page } from '@playwright/test';
import { TestPage } from '../pages/TestPage';


test.describe('"Call Us" widget functionality check', () => {
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

  test('UI page view check', async ({page}) => {
    await expect(testPage.callUsButton).toBeVisible();
    await expect(page).toHaveScreenshot('example-page.png', {
      maxDiffPixelRatio: 0.1, // 10% difference allowed
    });
  });
  
});

//*********** API test example ************/
test.describe('API tests', () => {

  test('API GET request check', async ({ request }: { request: APIRequestContext }) => {
    const response = await request.get('https://qa1.chat-api.intaker.xyz/api/v2/Chat/countries-v2?directLink=demoorg', {
      headers: {
        'Content-Type': 'application/json', 
      },
    });
    expect(response.ok(), 'Response was not OK').toBeTruthy();         
    expect(response.status(), 'Unexpected response status').toBe(200);     

    const responseJson = await response.json();   
    expect(Array.isArray(responseJson)).toBeTruthy();   
    expect(responseJson.length).toBe(250);   
  });

});