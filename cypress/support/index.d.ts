/// <reference types="cypress" />

interface User {
  email: string;
  password: string;
  username: string;
}

declare namespace Cypress {
  interface Chainable<Subject> {
    findByPlaceholder(placeholder: string): Chainable<Element>;
    assertPageUrl(url: string): Chainable<Subject>;
    registerNewUser(): Chainable<User>;
    findByTestId(testId: string): Chainable<Element>;
    login(user: User): Chainable<any>;
    findH1ByText(text: string): Chainable<Element>; // Добавляем эту строку для findH1ByText
    checkSwalText(text: string): Chainable<Element>; // Добавляем эту строку для checkSwalText
    clickButWithClass(className: string): Chainable<Element>; // Добавляем эту строку для clickButWithClass
  }
}
