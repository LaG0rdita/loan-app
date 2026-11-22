
import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/home-page';

let homePage: HomePage;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.open();
});

test('Check the default status of Home Page', async () => {
    await expect(homePage.amountField).toHaveValue('500');
    await expect(homePage.periodField).toHaveValue('12');

    await expect(homePage.calculateButton).toBeVisible();
    await expect(homePage.calculateButton).toBeEnabled();

    await expect(homePage.applyButton).toBeVisible();
    await expect(homePage.applyButton).toBeDisabled();
});

test('Calculate loan and check Apply button state', async () => {
    await homePage.calculateLoan();

    await expect(homePage.monthlyPayment).toBeVisible();
    await expect(homePage.applyButton).toBeEnabled();

    await homePage.enterLoanAmount('1000');

    await expect(homePage.applyButton).toBeDisabled();

    await homePage.calculateLoan();

    await expect(homePage.applyButton).toBeEnabled();

    await homePage.selectLoanPeriod(24);

    await expect(homePage.applyButton).toBeDisabled();

    await homePage.calculateLoan();

    await expect(homePage.monthlyPayment).toBeVisible();
    await expect(homePage.applyButton).toBeEnabled();
});

test('Check error message for invalid loan amounts', async () => {
    await homePage.enterLoanAmount('499');
    await homePage.calculateLoan();

    await expect(homePage.loanCalculationError).toBeVisible();
    await expect(homePage.loanCalculationError).toHaveText('Oops, something went wrong');

    await homePage.enterLoanAmount('10001');
    await homePage.calculateLoan();

    await expect(homePage.loanCalculationError).toBeVisible();
    await expect(homePage.loanCalculationError).toHaveText('Oops, something went wrong');

    await homePage.amountField.clear();
    await homePage.calculateLoan();

    await expect(homePage.loanCalculationError).toBeVisible();
    await expect(homePage.loanCalculationError).toHaveText('Oops, something went wrong');
});

test('Check scrolling an element into view', async () => {
    await homePage.scrollToImageButton();

    await expect(homePage.imageButton).toBeInViewport();
});
