import { type Page, type Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly url: string = 'https://loan-decision.tl-academy.ee/small-loan';

    readonly title: Locator;
    readonly amountField: Locator;
    readonly amountSlider: Locator;
    readonly periodField: Locator;
    readonly periodSlider: Locator;
    readonly calculateButton: Locator;
    readonly applyButton: Locator;

    readonly monthlyPayment: Locator;
    readonly loanCalculationError: Locator;
    readonly imageButton: Locator;


    constructor(page: Page) {
        this.page = page;

        this.title = page.getByTestId('id-small-loan-calculator-title');
        this.amountField = page.getByTestId('id-small-loan-calculator-field-amount');
        this.amountSlider = page.getByTestId('id-small-loan-calculator-field-amount-slider');
        this.periodField = page.getByTestId('ib-small-loan-calculator-field-period');
        this.periodSlider = page.getByTestId('ib-small-loan-calculator-field-period-slider');
        this.calculateButton = page.getByTestId('id-small-loan-calculator-field-calculate');
        this.applyButton = page.getByTestId('id-small-loan-calculator-field-apply');

        this.monthlyPayment = page.getByTestId('ib-small-loan-calculator-field-monthlyPayment');
        this.loanCalculationError = page.getByTestId('id-small-loan-calculator-field-error');
        this.imageButton = page.getByTestId('id-image-element-button-image-1');
    }
    async open() {
        await this.page.goto(this.url);
    }
    async calculateLoan() {
        await this.calculateButton.click();
    }
    async applyForLoan() {
        await this.applyButton.click();
    }
    async enterLoanAmount(amount: string) {
        await this.amountField.fill(amount);
    }
    async selectLoanPeriod(months: number) {
        await this.periodField.selectOption(String(months));
    }
    async scrollToImageButton() {
        await this.imageButton.scrollIntoViewIfNeeded();
    }
}