import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { LoginPage } from '../pages/login-page';
import { LoanDetailsPage } from '../pages/loan-details-page';
import { IncomePage } from '../pages/income-page';

let homePage: HomePage;
let loginPage: LoginPage;
let loanDetailsPage: LoanDetailsPage;
let incomePage: IncomePage;

test('Complete loan application - blacklisted applicant is declined', async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    loanDetailsPage = new LoanDetailsPage(page);
    incomePage = new IncomePage(page);

    // 1. Open calculator and apply
    await homePage.open();
    await homePage.calculateLoan();
    await homePage.applyForLoan();

    // 2. Login with blacklisted Smart-ID
    await loginPage.signInWithSmartID('38001010003');

    // 3. Verify Loan Details page
    await expect(loanDetailsPage.loanDetailsTitle).toBeVisible();
    await expect(loanDetailsPage.loanAmount).toHaveText('500 €');

    // 4. Continue to Income page
    await loanDetailsPage.continue();
    await expect(incomePage.incomePageTitle).toBeVisible();

    // 5. Enter sufficient income and request decision
    await incomePage.enterIncome('5000');
    await incomePage.getDecision();

    // 6. Verify declined decision
    await expect(incomePage.decisionDeclinedTitle).toHaveText('Loan declined');
    await expect(incomePage.decisionDeclinedText).toBeVisible();
});