
import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { LoginPage } from '../pages/login-page';
import { LoanDetailsPage } from '../pages/loan-details-page';
import { IncomePage } from '../pages/income-page';

let homePage: HomePage;
let loginPage: LoginPage;
let loanDetailsPage: LoanDetailsPage;
let incomePage: IncomePage;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    loanDetailsPage = new LoanDetailsPage(page);
    incomePage = new IncomePage(page);

    await homePage.open();
    await homePage.calculateLoan();
    await homePage.applyForLoan();

    await loginPage.signInWithPassword('anna', 'Tallinn1');
    await loanDetailsPage.continue();
});

test('Check default state of Income Page', async () => {
    await expect(incomePage.incomePageTitle).toBeVisible();
    await expect(incomePage.incomePageTitle).toHaveText('Your monthly income');

    await expect(incomePage.incomePageHint).toBeVisible();
    await expect(incomePage.incomePageHint).toHaveText('Net income per month, after taxes');

    await expect(incomePage.monthlyIncomeInput).toBeVisible();
    await expect(incomePage.getDecisionButton).toBeDisabled();
    await expect(incomePage.backButton).toBeEnabled();

    await incomePage.enterIncome('0');
    await expect(incomePage.getDecisionButton).toBeDisabled();

    await incomePage.enterIncome('2000');
    await expect(incomePage.getDecisionButton).toBeEnabled();
});

test('Click Back button returns to Loan Details page', async () => {
    await incomePage.backButton.click();

    await expect(loanDetailsPage.loanDetailsTitle).toBeVisible();
    await expect(loanDetailsPage.continueButton).toBeVisible();
});

test('Get decision - Loan approved', async () => {
    await incomePage.enterIncome('5000');
    await incomePage.getDecision();

    await expect(incomePage.decisionApprovedIcon).toBeVisible();
    await expect(incomePage.decisionApprovedTitle).toHaveText('Loan approved!');
    await expect(incomePage.decisionApprovedText).toHaveText(
        'Your income is sufficient for this loan. We will contact you shortly.'
    );
});

test('Get decision - Loan declined', async () => {
    await incomePage.enterIncome('1');
    await incomePage.getDecision();

    await expect(incomePage.decisionDeclinedIcon).toBeVisible();
    await expect(incomePage.decisionDeclinedTitle).toHaveText('Loan declined');
    await expect(incomePage.decisionDeclinedText).toHaveText(
        'The monthly payment is too high compared to your income. Try a smaller amount or a longer period.'
    );
});

test('Click OK after loan approval returns to Home Page', async () => {
    await incomePage.enterIncome('5000');
    await incomePage.getDecision();

    await incomePage.decisionOKButton.click();

    await expect(homePage.calculateButton).toBeVisible();
    await expect(homePage.calculateButton).toBeEnabled();
    await expect(homePage.applyButton).toBeVisible();
    await expect(homePage.applyButton).toBeDisabled();
});

test('Click OK after loan decline returns to Home Page', async () => {
    await incomePage.enterIncome('1');
    await incomePage.getDecision();

    await incomePage.decisionOKButton.click();

    await expect(homePage.calculateButton).toBeVisible();
    await expect(homePage.calculateButton).toBeEnabled();
    await expect(homePage.applyButton).toBeVisible();
    await expect(homePage.applyButton).toBeDisabled();
});

test.describe('Blacklisted applicant', () => {

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        loanDetailsPage = new LoanDetailsPage(page);
        incomePage = new IncomePage(page);

        await homePage.open();
        await homePage.calculateLoan();
        await homePage.applyForLoan();

        await loginPage.signInWithSmartID('38001010003');
        await loanDetailsPage.continue();
    });

    test('Blacklisted user is declined despite sufficient income', async () => {
        await incomePage.enterIncome('5000');
        await incomePage.getDecision();

        await expect(incomePage.decisionDeclinedIcon).toBeVisible();
        await expect(incomePage.decisionDeclinedTitle).toHaveText('Loan declined');
    });
});

