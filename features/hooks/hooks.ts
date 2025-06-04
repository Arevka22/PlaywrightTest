const {After, Before, AfterStep, Status} = require('@cucumber/cucumber');
import { Browser, BrowserContext } from "@playwright/test";
const playwright = require('@playwright/test');
import { getEnv } from "../../env/env";

let browser: Browser;   // entire browser process
let context: BrowserContext;  // browser context for each scenario

Before(async function () {
    // This hook will be executed before all scenarios
    console.log("First LOG record");
    getEnv();
    //browser = await invokeBrowser();

    const browser = await playwright.chromium.launch({
      headless: false,
  });
     const context = await browser.newContext();
     this.page =  await context.newPage();
     this.poManager = new POManager(this.page);
     this.page.setDefaultTimeout(15000);
  });

  AfterStep( async function ({result}) {
    // This hook will be executed after all steps, and take a screenshot on step failure
    if (result.status === Status.FAILED) {
      const buffer = await this.page.screenshot();
      await this.page.screenshot({ path: 'screenshot1.png' });
      this.attach(buffer.toString('base64'), 'base64:image/png');
      console.log("Screenshot logged")
    }
  });

  After(async function () {
    console.log("LAST LOG");
  });

  
