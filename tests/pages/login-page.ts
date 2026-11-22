import { type Page, type Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;

    readonly loginTitle: Locator;
    readonly UsernamePasswordTab: Locator;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly continueButton: Locator;
    readonly smartIdTab: Locator;
    readonly personalIdCodeField: Locator;

    readonly usernameError: Locator;
    readonly loginError: Locator;


    constructor(page: Page) {
        this.page = page;

        this.loginTitle = page.getByTestId('login-popup-title');
        this.UsernamePasswordTab = page.getByTestId('login-popup-tab-password');
        this.usernameField = page.getByTestId('login-popup-username-input');
        this.passwordField = page.getByTestId('login-popup-password-input');
        this.continueButton = page.getByTestId('login-popup-continue-button');
        this.smartIdTab = page.getByTestId('login-popup-tab-smart-id');
        this.personalIdCodeField = page.getByTestId('login-popup-personal-code-input');

        this.usernameError = page.getByTestId('login-popup-username-error');
        this.loginError = page.getByTestId('login-popup-password-error');
    }

    async signInWithPassword(username: string, password: string) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.continueButton.click();
    }

    async signInWithSmartID(smartID: string) {
        await this.smartIdTab.click();
        await this.personalIdCodeField.fill(smartID);
        await this.continueButton.click();
    }
}