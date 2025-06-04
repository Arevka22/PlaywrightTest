import { LoginPage } from "./LoginPage";
import { test, expect, Locator, Page } from '@playwright/test';


export class POManager
{
    page : Page;
    loginPage: LoginPage;

constructor(page: Page)
{
    this.page = page;
    this.loginPage = new LoginPage(this.page);
}

getLoginPage()
{
    return this.loginPage;
}

}
module.exports = {POManager};