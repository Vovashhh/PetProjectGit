# Cypress Automation Testing Project 🚀

Hello! This is my pet project for automation testing using Cypress. 🧪

## Prerequisites 🛠️

To successfully run the tests, make sure you have the following tools installed:

- [Cypress](https://www.cypress.io/)
- [Docker](https://www.docker.com/)

## Running Automated Tests 🏃

```bash
# 1. Clone the repository:
git clone [https://github.com/Vovashhh/PetProjectGit.git]

# 2. Open the command line and navigate to the project folder:
cd [PetProjectGit\deno-drash-realworld-example-app-master]

# 3. To start the container, run the following commands:
docker-compose build
docker-compose up

# 4. Open a new command line window and navigate to the project's root.

# 5. Launch Cypress using the following command:
npx cypress open

# 6. Follow the on-screen instructions to run and execute the automated tests. 🧐

# Project Description: Cypress Testing for https://react-redux.realworld.io/

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

## Conclusion

This project serves as a practical exercise in Cypress testing, allowing testers to familiarize themselves with the testing environment and various custom commands for efficient testing procedures. While not striving for complete test coverage, it provides valuable experience in quality assurance processes.

