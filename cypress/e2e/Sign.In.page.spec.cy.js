/// <reference types="cypress" />

beforeEach(() => {
cy.visit('/login');
});

describe('Sign In Page', () => {

  it('should allow to log in ', () => {
  cy.get('h1')
    .should('contain.text', 'Sign in');
  cy.registerNewUser().then(({email, password, username}) =>{
    cy.findByPlaceholder('Email')
    .type(email);
  cy.findByPlaceholder('Password')
    .type(password);
  cy.get('.btn')
  .click();
  cy.get(':nth-child(4) > .nav-link').should('contain.text', username)
  })
});
});