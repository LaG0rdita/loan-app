import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { LoginPage } from '../pages/login-page';
import { LoanDetailsPage } from '../pages/loan-details-page';
import { IncomePage } from '../pages/income-page';

let homePage: HomePage;
let loginPage: LoginPage;
let loanDetailsPageSpec: LoanDetailsPage;
let incomePage: IncomePage;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    loanDetailsPageSpec = new LoanDetailsPage(page);
    incomePage = new IncomePage(page);

    await homePage.open();
    await homePage.calculateLoan();
    await homePage.applyForLoan();

    await loginPage.signInWithPassword('anna', 'Tallinn1');
});

test('Verify loan amount, monthly payment and period', async () => {
    await expect(loanDetailsPageSpec.loanAmount).toHaveText('500 €');
    await expect(loanDetailsPageSpec.monthlyPayment).toHaveText('42.8 €');
    await expect(loanDetailsPageSpec.period).toHaveText('12 months');
});

test('Check default state of Loan Details page', async () => {
    await expect(loanDetailsPageSpec.loanDetailsTitle).toBeVisible();
    await expect(loanDetailsPageSpec.yourInformationTitle).toBeVisible();

    await expect(loanDetailsPageSpec.fullNameField).toBeVisible();
    await expect(loanDetailsPageSpec.languageOptions).toBeVisible();
    await expect(loanDetailsPageSpec.languageOptions).toContainText('English');

    await expect(loanDetailsPageSpec.continueButton).toBeVisible();
    await expect(loanDetailsPageSpec.backButton).toBeVisible();
});

test('Click Continue button navigates to Income Page', async () => {
    await loanDetailsPageSpec.continue();

    await expect(incomePage.incomePageTitle).toBeVisible();
    await expect(incomePage.incomePageTitle).toHaveText('Your monthly income');

    await expect(incomePage.incomePageHint).toBeVisible();
    await expect(incomePage.incomePageHint).toHaveText('Net income per month, after taxes');

    await expect(incomePage.monthlyIncomeInput).toBeVisible();
    await expect(incomePage.getDecisionButton).toBeVisible();
});

test('Click Back button returns to Home Page', async ({ page }) => {
    await loanDetailsPageSpec.backButton.click();

    await expect(homePage.calculateButton).toBeVisible();
    await expect(homePage.applyButton).toBeVisible();
});

