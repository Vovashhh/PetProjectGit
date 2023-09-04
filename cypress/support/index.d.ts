/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    findByPlaceholder(placeholder: string): Chainable<any>
    assertPageUrl(url: string): Chainable<any>
    findByTestId(TestId: string): Chainable<any>
    login(email, password: string): Chainable<any>

  }
}