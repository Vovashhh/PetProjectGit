/// <reference types="cypress" />

beforeEach(() => {
  cy.visit('/');
});

describe('It should have a title', () => {
  it('should have all parts', () => {
    cy.get('h1').should('contain.text', 'conduit');
  });

  it('should have Global Feed', () => {
    cy.contains('a', 'Global Feed').should('be.visible');
  });

  it('should have Popular tags', () => {
    cy.contains('.sidebar', 'Popular Tags').should('be.visible');
  });

  it('should click on Sign in', () => {
    cy.contains('a', 'Sign in').click();
    cy.url().should('include', '/login');
    cy.get('h1').should('contain.text', 'Sign in');
  });

  it('should click on Sign up', () => {
    cy.contains('a', 'Sign up').click();
    cy.url().should('include', '/register');
    cy.get('h1').should('contain.text', 'Sign up');
  });
});
