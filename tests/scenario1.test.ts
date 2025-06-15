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

test.describe('Scenario1: Multi-Filter and Sorting Validation', () => {
    test('Validate filter + sort results', async () => {
        await page.goto(COURSE_DETAILS.url, { waitUntil: 'domcontentloaded' });
        await expect(page).toHaveTitle(COURSE_DETAILS.title);
        await expect(page).toHaveURL(COURSE_DETAILS.url);
        console.log('Navigated to the catalog page successfully.');

        //After navigating to the catalog page, wait for the search input to be visible
        await coursePage.search('data');
        //selecting the "Data Science" and "Intermediate" filters
        await coursePage.applyFilter('data science', 'intermediate');
        //Selecting the "Highest Rated" sort option and validating the results
        await coursePage.sortBy('Highest Rated');
        // Validate that the courses displayed are indeed "Intermediate" level
        await coursePage.verifyIntermediateCourses();
        // Additional validation for course titles and ratings
        await coursePage.verifyCourseTitles();
        await coursePage.verifyRatings();
    });
});

test.afterAll(async () => {
    // Clear storage and cookies
    await page.evaluate(() => {
        localStorage.clear();
        sessionStorage.clear();
    });
    await context.clearCookies();
    await context.close();
    console.log('Cleaned up context and storage.');
});
