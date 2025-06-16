# playwright_automation
# Playwright Automation Project

This project uses [Playwright](https://playwright.dev/) for end-to-end and API testing of the Udacity course catalog.

## Project Structure

- `tests/`  
  Contains Playwright test files for UI and API scenarios.
- `pages/`  
  Page Object Model classes for encapsulating page interactions.
- `elementSelector/`  
  JSON files with selectors for UI elements.
- `utils/`  
  Utility files and constants.
- `playwright.config.ts`  
  Playwright configuration.
- `.github/workflows/`  
  GitHub Actions workflow for CI.

## Setup

1. **Install dependencies**
   npm install

2. **Run Test** 
   npm run scenario1
   npm run scenario2

## Steps to integrate with jenkins
   1 - Download jekins and install
   2 - Run jenkins on local machine
   3 - After installation create project in jekins
   4 - Complete configuration
       in config select execute windows shell option and add below command
       $ git clone <repo-link> or local repo path
       $ npm install
       $ npx playwright test test_name