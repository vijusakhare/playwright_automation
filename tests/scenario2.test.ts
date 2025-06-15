import { test, expect, BrowserContext, Page } from '@playwright/test';
import { CoursePage } from '../pages/courses.page';
import { COURSE_DETAILS } from '../utils/constants';

let page: Page;
let context: BrowserContext;
let coursePage: CoursePage;

test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    coursePage = new CoursePage(page);
});

test('Scenario2: Invalid Search with No Results', async ({ page }) => {
    await page.goto(COURSE_DETAILS.url, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(COURSE_DETAILS.title);
    await expect(page).toHaveURL(COURSE_DETAILS.url);
    console.log('Navigated to the catalog page successfully.');

    //After navigating to the catalog page, wait for the search input to be visible
    await coursePage.search('SomeRandomTermThatDoesNotExist');

    //verify no result message and overlay image
    await coursePage.verifyNoResults();
    console.log('Verified no results found for the invalid search term.'); 
});