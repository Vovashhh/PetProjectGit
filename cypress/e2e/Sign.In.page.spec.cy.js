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

it('should allow to log in with use Enter', () => {
  cy.get('h1').should('contain.text', 'Sign in');

  cy.registerNewUser().then(({email, password, username}) =>{

  cy.findByPlaceholder('Email').type(email);

  cy.findByPlaceholder('Password').type(password + `{Enter}`);

  cy.get(':nth-child(4) > .nav-link').should('contain.text', username)
  })
});

it('should not log in whithout Email ', () => {
  cy.get('h1').should('contain.text', 'Sign in');

  cy.registerNewUser().then(({password}) =>{

  cy.findByPlaceholder('Password').type(password + `{Enter}`);

  cy.get('.swal-text').should('contain.text', 'Email field required.');
  })
});

it('should not log in whithout Password ', () => {
  cy.get('h1').should('contain.text', 'Sign in');

  cy.registerNewUser().then(({email}) =>{

  cy.findByPlaceholder('Email').type(email + `{Enter}`);

  cy.get('.swal-text').should('contain.text', 'Password field required.');
  })
});

it('should not log in with wrong Email ', () => {
  cy.get('h1').should('contain.text', 'Sign in');

  cy.registerNewUser().then(({email, password, username}) =>{

  cy.findByPlaceholder('Email').type(email + 'g');

  cy.findByPlaceholder('Password').type(password + `{Enter}`);

  cy.get('.swal-text').should('contain.text', 'Invalid user credentials.');
  })
});

it('should not log in with wrong Password ', () => {
  cy.get('h1').should('contain.text', 'Sign in');

  cy.registerNewUser().then(({email, password, username}) =>{

  cy.findByPlaceholder('Email').type(email);

  cy.findByPlaceholder('Password').type(password + `f` + `{Enter}`);

  cy.get('.swal-text').should('contain.text', 'Invalid user credentials.');
  })
});


});