import { Page, expect } from '@playwright/test';
import * as courseSelector from '../elementSelector/courses.json'


export class CoursePage {
    constructor(private page: Page) { }


    async search(term: string) {
        await this.page.waitForSelector(courseSelector.searchInput);
        await this.page.locator(courseSelector.searchInput).first().click();
        await this.page.getByRole('searchbox', { name: 'Search input' }).fill(term);
        await this.page.getByRole('searchbox', { name: 'Search input' }).press('Enter');
        await this.page.waitForTimeout(2000);
    }

    async applyFilter(skill: string, level: string) {
        await this.page.getByRole('button', { name: 'School' }).click();
        await this.page.waitForTimeout(1000);
        await this.page.locator(`label:has-text("${skill}") .chakra-checkbox__control`).nth(1).click();
        await this.page.getByRole('button', { name: 'Level' }).click();
        await this.page.waitForTimeout(1000);
        await this.page.locator(`label:has-text("${level}") .chakra-checkbox__control`).nth(1).click();
        await this.page.waitForTimeout(1000);
    }

    async sortBy(option: string) {
        await this.page.locator('div', { hasText: /^Sort by/ }).first().click();
        await this.page.getByText(option, { exact: true }).nth(0).click();
        await this.page.waitForTimeout(2000);
    }

    async verifyIntermediateCourses() {
        await this.page.waitForSelector('article[role="group"]');
        const intermediateElements = await this.page.locator(courseSelector.intermediateElements).allTextContents();
        console.log(`Number of intermediate elements found: ${intermediateElements.length}`);
        expect(intermediateElements.length).toBeGreaterThan(0);
        for (const content of intermediateElements) {
            console.log('Course levels:', content);
            expect(content.toLowerCase()).toContain('intermediate');
        }
    }

    async verifyCourseTitles() {
        const headings = this.page.locator(courseSelector.courseHeading);
        const count = await headings.count();
        console.log(`Number of courses found: ${count}`);
        expect(count).toBeGreaterThan(0);
        for (let i = 0; i < count; i++) {
            const title = await headings.nth(i).innerText();
            console.log(`Course ${i + 1}: ${title}`);
        }
    }

    async verifyRatings() {
        const ratingLocator = this.page.locator(courseSelector.ratingLocator);
        const ratingCount = await ratingLocator.count();
        console.log(`Number of ratings found: ${ratingCount}`);
        expect(ratingCount).toBeGreaterThan(0); // Adjust this based on expected ratings
    }

    async verifyNoResults() {
        const noResults = this.page.locator('h2', { hasText: 'No Results Found' }).first();
        await expect(noResults).toBeVisible();
        const noResultsMessage = this.page.locator('p', { hasText: 'We could not find any results matching the provided filters.' }).first();
        await expect(noResultsMessage).toBeVisible();
    }
}