
import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/home-page';
import { LoginPage } from '../pages/login-page';
import { LoanDetailsPage } from '../pages/loan-details-page';

let homePage: HomePage;
let loginPage: LoginPage;
let loanDetailsPage: LoanDetailsPage;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);

    await homePage.open();
    await homePage.calculateLoan();
    await homePage.applyForLoan();
});

test('Check the default state of Login Page', async () => {
    await expect(loginPage.loginTitle).toBeVisible();

    await expect(loginPage.usernameField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();
    await expect(loginPage.continueButton).toBeDisabled();

    await loginPage.smartIdTab.click();

    await expect(loginPage.personalIdCodeField).toBeVisible();
    await expect(loginPage.continueButton).toBeDisabled();
});

test('Successful login with username and password', async () => {
    await loginPage.signInWithPassword('anna', 'Tallinn1');

    await expect(loginPage.page).toHaveURL('https://loan-decision.tl-academy.ee/loan-decision');
});

test('Unsuccessful login with incorrect password', async () => {
    await loginPage.signInWithPassword('anna', 'WrongPassword');

    await expect(loginPage.loginError).toBeVisible();
});

test('Successful login with Smart-ID', async () => {
    await loginPage.signInWithSmartID('39001010001');

    await expect(loginPage.page).toHaveURL('https://loan-decision.tl-academy.ee/loan-decision');
});

test('Blacklisted Smart-ID proceeds to Loan Details', async () => {
    await loginPage.signInWithSmartID('38001010003');

    loanDetailsPage = new LoanDetailsPage(loginPage.page);

    await expect(loanDetailsPage.loanDetailsTitle).toBeVisible();
    await expect(loanDetailsPage.yourInformationTitle).toBeVisible();
    await expect(loanDetailsPage.continueButton).toBeVisible();
    await loanDetailsPage.continue();
});


