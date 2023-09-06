// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { generateUser } from '../support/ganagate.users';

Cypress.Commands.add('findByPlaceholder', (placeholder) => {
  cy.get(`[placeholder="${placeholder}"]`);
});

Cypress.Commands.add('findH1ByText', (text) => {
  cy.get('h1').should('contain.text', text);
});

Cypress.Commands.add('checkSwalText', (text) => {
  cy.get('.swal-text').should('contain.text', text);
});

Cypress.Commands.add('clickButWithClass', (className) => {
  cy.get(`.${className}`).click();
});

Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  originalFn('/#' + url);
});

Cypress.Commands.add('registerNewUser', () => {
  // const {email, username, password} = generateUser()
  const { email, username, password } = generateUser();
  cy.request('POST', '/users', {
    email,
    password,
    username,
  }).then((response) => ({
    ...response.body.user,
    password,
  }));
});

Cypress.Commands.add('login', (user) => {
  cy.request('POST', 'users/login', {
    user,
  }).then((response) => {
    cy.setCookie('drash_sess', response.body.user.token);
  });
});

Cypress.Commands.add('findByTestId', (value) => {
  cy.get(`[data-cy=${value}]`);
});

Cypress.Commands.add('assertPageUrl', (url) => {
  cy.url().should('equal', Cypress.config().baseUrl + url);
});

Cypress.Commands.add('registerAndLogin', () => {
  cy.registerNewUser().then((user) => {
    cy.login(user).then(() => user);
  });
});

Cypress.Commands.add('findByCss', (selector) => {
  cy.get(selector);
});
