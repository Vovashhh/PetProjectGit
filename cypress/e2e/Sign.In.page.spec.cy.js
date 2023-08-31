/// <reference types="cypress" />

beforeEach(() => {
cy.visit('/');
});

describe('My home page', () => {
// Проверяем что при клике на Sign In открывается соответсвующая страница
it('should click on Sign in', () => {
  cy.contains('a', 'Sign in')
    .should('exist')
    .click();

  cy.url().should('include', '/login');
  cy.get('h1').should('contain.text', 'Sign in');
});
});