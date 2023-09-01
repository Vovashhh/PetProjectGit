/// <reference types="cypress" />

describe('Settings page', () => {

beforeEach(() => {
  cy.visit('/login');

  cy.intercept('POST', '/users/login').as('login')
  cy.registerNewUser().then(({email, password}) =>{

  cy.findByPlaceholder('Email').type(email);

  cy.findByPlaceholder('Password').type(password + `{Enter}`);

  });

  cy.wait('@login')

  cy.visit('/settings');
});

  it('Should have a correct title', () => {

  });

})