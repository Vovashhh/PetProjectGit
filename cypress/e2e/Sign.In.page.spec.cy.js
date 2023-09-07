/// <reference types="cypress" />

beforeEach(() => {
  cy.visit('/login');
});

describe('Sign In Page', () => {
  it('should allow to log in ', () => {
    cy.findH1ByText('Sign in');
    cy.registerNewUser().then(({ email, password, username }) => {
      cy.findByPlaceholder('Email').type(email);
      cy.findByPlaceholder('Password').type(password);
      cy.clickButWithClass('btn');

      cy.get(':nth-child(4) > .nav-link').should('contain.text', username);
    });
  });

  it('should allow logging in using Enter key', () => {
    cy.findH1ByText('Sign in');

    cy.registerNewUser().then(({ email, password, username }) => {
      cy.findByPlaceholder('Email').type(email);

      cy.findByPlaceholder('Password').type(password + `{Enter}`);

      cy.get(':nth-child(4) > .nav-link').should('contain.text', username);
    });
  });

  it('should not log in without an Email', () => {
    cy.findH1ByText('Sign in');

    cy.registerNewUser().then(({ password }) => {
      cy.findByPlaceholder('Password').type(password + `{Enter}`);

      cy.checkSwalText('Email field required.');
    });
  });

  it('should not log in without a Password', () => {
    cy.findH1ByText('Sign in');

    cy.registerNewUser().then(({ email }) => {
      cy.findByPlaceholder('Email').type(email + `{Enter}`);

      cy.checkSwalText('Password field required.');
    });
  });

  it('should not log in with an incorrect Email', () => {
    cy.findH1ByText('Sign in');

    cy.registerNewUser().then(({ email, password }) => {
      cy.findByPlaceholder('Email').type(email + 'g');

      cy.findByPlaceholder('Password').type(password + `{Enter}`);

      cy.checkSwalText('Invalid user credentials.');
    });
  });

  it('should not log in with an incorrect Password', () => {
    cy.findH1ByText('Sign in');

    cy.registerNewUser().then(({ email, password }) => {
      cy.findByPlaceholder('Email').type(email);

      cy.findByPlaceholder('Password').type(password + `f` + `{Enter}`);

      cy.checkSwalText('Invalid user credentials.');
    });
  });
});
