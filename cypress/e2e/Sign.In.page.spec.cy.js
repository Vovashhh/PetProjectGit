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

  it('should allow to log in with use Enter', () => {
    cy.findH1ByText('Sign in');

    cy.registerNewUser().then(({ email, password, username }) => {
      cy.findByPlaceholder('Email').type(email);

      cy.findByPlaceholder('Password').type(password + `{Enter}`);

      cy.get(':nth-child(4) > .nav-link').should('contain.text', username);
    });
  });

  it('should not log in whithout Email ', () => {
    cy.findH1ByText('Sign in');

    cy.registerNewUser().then(({ password }) => {
      cy.findByPlaceholder('Password').type(password + `{Enter}`);

      cy.checkSwalText('Email field required.');
    });
  });

  it('should not log in whithout Password ', () => {
    cy.findH1ByText('Sign in');

    cy.registerNewUser().then(({ email }) => {
      cy.findByPlaceholder('Email').type(email + `{Enter}`);

      cy.checkSwalText('Password field required.');
    });
  });

  it('should not log in with wrong Email ', () => {
    cy.findH1ByText('Sign in');

    cy.registerNewUser().then(({ email, password, username }) => {
      cy.findByPlaceholder('Email').type(email + 'g');

      cy.findByPlaceholder('Password').type(password + `{Enter}`);

      cy.checkSwalText('Invalid user credentials.');
    });
  });

  it('should not log in with wrong Password ', () => {
    cy.findH1ByText('Sign in');

    cy.registerNewUser().then(({ email, password, username }) => {
      cy.findByPlaceholder('Email').type(email);

      cy.findByPlaceholder('Password').type(password + `f` + `{Enter}`);

      cy.checkSwalText('Invalid user credentials.');
    });
  });
});
