/// <reference types="cypress" />

beforeEach(() => {
  cy.visit('/');
});

describe('It should have a title', () => {
  it('should have all parts', () => {
    cy.findH1ByText('conduit');
  });

  it('Verify the Presence of Global Feed Section', () => {
    cy.contains('a', 'Global Feed').should('be.visible');
  });

  it('Verify the Presence of Popular Tags Section', () => {
    cy.contains('.sidebar', 'Popular Tags').should('be.visible');
  });

  it('Click on Sign in', () => {
    cy.contains('a', 'Sign in').click();
    cy.assertPageUrl('/#/login')
    cy.findH1ByText('Sign in');
  });

  it('Click on Sign up', () => {
    cy.contains('a', 'Sign up').click();
    cy.assertPageUrl('/#/register');
    cy.findH1ByText('Sign up');
  });
});
