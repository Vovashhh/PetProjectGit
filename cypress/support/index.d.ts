/// <reference types="cypress" />

interface User {
  email: string;
  password: string;
  username: string;
}
declare namespace Cypress {
  interface Chainable<Subject> {

    findByPlaceholder(placeholder: string): Chainable<any>
    assertPageUrl(url: string): Chainable<any>
    registerNewUser(): Chainable<User>
    findByTestId(TestId: string): Chainable<any>
    login(user: User): Chainable<any>

  }
}