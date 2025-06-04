import {test, expect,Locator,Page} from '@playwright/test';
import { getEnv } from "../env/env";


export class LoginPage {
    
   //private base: PlaywrightWrapper
    page : Page
    emailInput : Locator
    passwordInput :Locator
    loginBtn : Locator
    logo : Locator
    
    constructor(page: Page) {
        //this.page = new PlaywrightWrapper(page);
         this.page = page;
         this.emailInput= page.locator("//input[@id='email']");
         this.passwordInput = page.locator("//input[@id='password']");
         this.loginBtn = page.locator("//button[@data-testid='sign-in']");
         this.logo = page.locator("//span[@data-testid='app-version']");
    }

    // private Elements = {
    //     emailInput: "//input[@id='email']",
    //     passwordInput: "",
    //     loginBtn: "//button[@data-testid='sign-in']",
    //     logo: "//span[@data-testid='app-version']"
    // }

    async goTo() {
    if (!process.env.BASEURL) {
        throw new Error("BASEURL is not defined in the environment variables.");
    }
    await this.page.goto(process.env.BASEURL);
    }

    async enterEmail(email: string) {
        await this.emailInput.fill(email);
    }

     async enterPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        //await this.base.waitAndClick(this.Elements.loginBtn);
        await this.loginBtn.click();
    }

    async checkLogoIsVisible() {
     //await this.base.waitAndClick(this.Elements.logo);
       await expect(this.logo).toBeVisible();
    }
}
module.exports = {LoginPage};