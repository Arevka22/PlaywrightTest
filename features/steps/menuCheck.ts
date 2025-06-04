
// const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
// const playwright = require('@playwright/test');
// const { POManager } = require('../../pages/POManager');
// const { LoginPage } = require('../../pages/LoginPage');
// const assert = require("assert");

import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import * as playwright from '@playwright/test';
import { POManager } from '../../pages/POManager';
import { LoginPage } from '../../pages/LoginPage';
import * as assert from 'assert';


//setDefaultTimeout(60 * 1000 * 2)

Given('User navigates to the website', async function () {
 
    this.poManager = new POManager(this.page)
    this.loginPage = this.poManager.getLoginPage()
    await this.loginPage.goTo();
    //loginPage = await fixture.page.goto(process.env.BASEURL)
    //await fixture.page.goto(process.env.BASEURL)
    //fixture.logger.info("Navigated to the website")

})

Given('User enter the username as {string}', async function (email) {
    //await fixture.page.locator("//input[@id='email']").type(email);
    await this.loginPage.enterEmail(email)
});

Given('User enter the password as {string}', async function (password) {
    //await fixture.page.locator("//input[@id='password']").type(password);
    await this.loginPage.enterPassword(password)
})

When('User click on the login button', async function () {
    // await fixture.page.locator("//button[@data-testid='sign-in']").click();
    // await fixture.page.waitForLoadState();
    // fixture.logger.info("Waiting for 7 seconds")
    // await fixture.page.waitForTimeout(7000);
    await this.loginPage.clickLoginButton()
});

Then('Logo should be visible', async function () {
    // const logo = fixture.page.locator("//span[@data-testid='app-version']");
    // await expect(logo).toBeVisible();
    // console.log("Logo");
    // fixture.logger.info("Logo");
     await this.loginPage.checkLogoIsVisible()
})



