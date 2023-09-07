# Cypress Automation Testing Project 🚀

Hello! This is my pet project for automation testing using Cypress. 🧪

## Prerequisites 🛠️

To successfully run the tests, make sure you have the following tools installed:

- [Cypress](https://www.cypress.io/)
- [Docker](https://www.docker.com/)

## Running Automated Tests 🏃

```bash
# 1. Clone the repository:
git clone https://github.com/Vovashhh/PetProjectGit.git

# 2. Clone the repository for docker and open in command line:
git clone https://github.com/drashland/deno-drash-realworld-example-app.git

# 3. To start the container, run the following commands in drashland/deno-drash-realworld:
docker-compose build
docker-compose up

# 4. Open a new command line window and navigate to the project's PetProjectGit.

# 5. Launch Cypress using the following command:
npx cypress open

# 6. Follow the on-screen instructions to run and execute the automated tests. 🧐

# Project Description: Cypress Testing for https://react-redux.realworld.io/

```

## Overview

This project focuses on conducting Cypress testing for a local version of the website [https://react-redux.realworld.io/](https://react-redux.realworld.io/#/?_k=zkfztn). It is important to note that the primary goal of this project is not to achieve complete test coverage but rather to explore and practice testing procedures.

## Custom Commands

In the `command.js` file, custom Cypress commands have been created to enhance code readability and automate routine actions during testing. Here's a brief overview of these custom commands:

### `findByPlaceholder`

- This command is used to locate an element by its placeholder attribute.

### `findH1ByText`

- Used for finding an element and comparing its text content.

### `checkSwalText`

- This command locates an element and verifies its text content.

### `clickButWithClass`

- Enables clicking on a button with a specific CSS class.

### `visit`

- Navigates to a specific page.

### `registerNewUser`

- Registers a new user using randomly generated data and the API.

### `login`

- Logs in as a user.

### `findByTestId`

- Although defined, this selector is not used in the project.

### `assertPageUrl`

- Verifies the current URL.

### `registerAndLogin`

- Combines user registration and login using the API.

### `findByCss`

- Searches for elements based on CSS selectors.

# Creating Test Data and Test Automation

In this repository, we employ certain practices and tools to create more realistic test data and automate tests in Cypress.

Using Faker.js Library

The `generate.users.js` and `generate.articles.js` files contain examples of using Faker.js to create user and article data, respectively.

To generate test data that closely resembles real-world data, we use the [@faker-js/faker](https://github.com/marak/Faker.js/) library. It allows us to create random but realistic data such as names, addresses, email addresses, and more. Applying realistic data in tests helps ensure more accurate and comprehensive coverage of various scenarios.

## index.d.ts File

For more convenient and automated test work, we've added scripts to the `index.d.ts` file. These scripts enable the use of custom commands with automatic input when working with Cypress tests. This makes the process of writing and maintaining tests more efficient and productive.

## Code Formatting with Prettier

To ensure code structure and cleanliness, we use the code formatting tool [Prettier](https://prettier.io/). Running the command `prettier --write .` automatically formats your code according to the established formatting rules. This helps make the code more readable and ensures compliance with coding standards.

# Cypress Automated Tests

This repository contains automated tests using Cypress for various pages and functionalities of a web application.

## Home Page Tests (home.page.spec.cy.js)

The `beforeEach` hook is used to navigate to the page before each test using a custom `visit` command. The tests include simple checks like verifying the page title and ensuring that working links are present on the home page.

## Sign-In Page Tests (Sign.In.page.spec.cy.js)

In these tests, we utilize a custom command called `registerNewUser`, which registers a new user using a POST request and retrieves user data using the `then` construct. The checks include entering incorrect data and verifying successful user login.

## Sign-Up Page Tests (Sign.Up.page.spec.cy.js)

These tests use a random data generator for user registration. After registration, the tests verify that the user is logged in and their username is displayed. Checks include field validation and error handling for specific scenarios.

## Settings Page Tests (Settings.page.spec.cy.js)

Since this work requires user login, the `beforeEach` hook uses a custom command called `registerAndLogin`, which combines custom commands `registerNewUser` and `login` to register and log in a user using API calls and cookie management to reduce test execution time. To improve code readability, long button names are stored in variables. Additionally, some data is stored in variables for easier reuse. Errors were identified in the tests "Can't choose a username with a space" and "Can change email with a password and login with new data."

## Articles Page Tests (articles.page.spec.cy.js)

Logging in is required for these tests, so the `visit` command is used. The tests use a generator for article names, descriptions, and text to provide more realistic test data. Since article URLs contain the article's name with spaces replaced by dashes and special characters removed, the `replace` method is used for verification.

## Conclusion

This project serves as a practical exercise in Cypress testing, allowing testers to familiarize themselves with the testing environment and various custom commands for efficient testing procedures. While not striving for complete test coverage, it provides valuable experience in quality assurance processes.
