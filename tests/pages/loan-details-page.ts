import { type Page, type Locator } from '@playwright/test';

export class LoanDetailsPage {
    readonly page: Page;

    readonly loanDetailsTitle: Locator;
    readonly loanAmount: Locator;
    readonly monthlyPayment: Locator;
    readonly period: Locator;

    readonly yourInformationTitle: Locator;
    readonly fullNameField: Locator;
    readonly languageOptions: Locator;

    readonly continueButton: Locator;
    readonly backButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.loanDetailsTitle = page.getByTestId('final-page-loan-details-title');
        this.loanAmount = page.getByTestId('final-page-amount');
        this.monthlyPayment = page.getByTestId('final-page-monthly-payment');
        this.period = page.getByTestId('final-page-period');

        this.yourInformationTitle = page.getByTestId('final-page-your-information-title');
        this.fullNameField = page.getByTestId('final-page-full-name');
        this.languageOptions = page.getByTestId('final-page-communication-language');

        this.continueButton = page.getByTestId('final-page-continue-button');
        this.backButton = page.getByTestId('final-page-back-button');
    }

    async continue() {
        await this.continueButton.click();
    }
}
