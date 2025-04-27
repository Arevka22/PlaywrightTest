import { Page, Locator } from '@playwright/test';

export class TestPage {
  private readonly url = 'https://qa1.intaker.xyz/home/widget/qa1/demo.html';
  public callUsButton: Locator;
  public requestPopup: Locator;
  public closePopupButton: Locator;
  public requestPopupTitle: Locator;
  public firstNameInput: Locator;
  public lastNameInput: Locator;
  public phoneNumberInput: Locator;
  public confirmationSignButton: Locator;
  public countryCodeDropdown: Locator;
  public confirmationMsg: Locator;

  constructor(private page: Page) {
    this.page = page;
    this.callUsButton = page.locator('xpath=//div[@id="icw--call--button"]');
    this.requestPopup = page.locator('xpath=//div[@id="icw--call--add--container"]');
    this.closePopupButton = page.locator('xpath=//div[@id="icw--call--add--container"]//button[@id="icw--call--add--close"]');
    this.requestPopupTitle = page.locator('xpath=//div[text()="Request a call back"]');
    this.firstNameInput = page.locator('xpath=//input[@id="icw--call--input-first"]');
    this.lastNameInput = page.locator('xpath=//input[@id="icw--call--input-last"]');
    this.phoneNumberInput = page.locator('xpath=//input[@id="icw--call--input"]');
    this.confirmationSignButton = page.locator('xpath=//button[@id="icw--call--done--button"]');
    this.countryCodeDropdown = page.locator('xpath=//select[@id="icw--call--select"]');
    this.confirmationMsg = page.locator('xpath=//span[@id="icw--call--done--result"]');
  }

  async navigateToPage(): Promise<void> {
    await this.page.goto(this.url);
  }

  async callUsButtonIsVisible(): Promise<void> {
    await this.callUsButton.isVisible();
  }

  async clickCallUsButton(): Promise<void> {
    await this.callUsButton.click();
  }

  async clickClosePopupButton(): Promise<void> {
    await this.closePopupButton.click();
  }

  async requestPopupIsVisible(): Promise<boolean> {
    return this.requestPopup.isVisible();
  }
  
  async requestPopupIsNotVisible(): Promise<boolean> {
    return this.requestPopup.isHidden();
  }

  async popupTitleIsVisible(): Promise<boolean> {
    return this.requestPopupTitle.isVisible();
  }

  async enterFirstName(firstName: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
  }

  async enterLastName(lastName: string): Promise<void> {
    await this.lastNameInput.fill(lastName);
  }

  async enterPhoneNumber(phoneNumber: string): Promise<void> {
    await this.phoneNumberInput.fill(phoneNumber);
  }

  async enterCountryCode(countryCode: string): Promise<void> {
    await this.countryCodeDropdown.click();
    await this.countryCodeDropdown.selectOption({ label: countryCode });
  }

  async clickConfirmationButton(): Promise<void> {
    await this.requestPopupTitle.isVisible();
    await this.requestPopupTitle.isEnabled();
    await this.confirmationSignButton.click();
  }

  async confirmationMsgIsVisible(): Promise<boolean> {
    return this.confirmationMsg.isVisible();
  }
}
