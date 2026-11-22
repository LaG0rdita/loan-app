
import { type Page, type Locator } from '@playwright/test';

export class IncomePage {
    readonly page: Page;

    readonly incomePageTitle: Locator;
    readonly incomePageHint: Locator;
    readonly monthlyIncomeInput: Locator;
    readonly getDecisionButton: Locator;
    readonly backButton: Locator;

    readonly decisionApprovedIcon: Locator;
    readonly decisionApprovedTitle: Locator;
    readonly decisionApprovedText: Locator;
    readonly decisionOKButton: Locator;

    readonly decisionDeclinedIcon: Locator;
    readonly decisionDeclinedTitle: Locator;
    readonly decisionDeclinedText: Locator;

    constructor(page: Page) {
        this.page = page;

        this.incomePageTitle = page.getByTestId('income-page-title');
        this.incomePageHint = page.getByTestId('income-page-hint');
        this.monthlyIncomeInput = page.getByTestId('income-page-input');
        this.getDecisionButton = page.getByTestId('income-page-submit-button');
        this.backButton = page.getByTestId('income-page-back-button');

        this.decisionApprovedIcon = page.getByTestId('decision-page-icon-approved');
        this.decisionApprovedTitle = page.getByTestId('decision-page-title');
        this.decisionApprovedText = page.getByTestId('decision-page-text');
        this.decisionOKButton = page.getByTestId('decision-page-ok-button');

        this.decisionDeclinedIcon = page.getByTestId('decision-page-icon-declined');
        this.decisionDeclinedTitle = page.getByTestId('decision-page-title');
        this.decisionDeclinedText = page.getByTestId('decision-page-text');
    }

    async enterIncome(amount: string) {
        await this.monthlyIncomeInput.fill(amount);
    }

    async getDecision() {
        await this.getDecisionButton.click();
    }
}
