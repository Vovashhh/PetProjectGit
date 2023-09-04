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

import {generateUser} from '../support/ganagate.users'

Cypress.Commands.add('findByPlaceholder', (placeholder) =>{
  cy.get(`[placeholder=${placeholder}]`);
})

Cypress.Commands.overwrite('visit', (originalFn, url, options) =>{
originalFn('/#' + url)
})

// Cypress.Commands.add('assertPageUrl', (url) => {
//   cy.url().should('equal', Cypress.config().baseUrl + '/#')
// })
// Вернуться к этому чуть позже и разобраться 

Cypress.Commands.add('registerNewUser', () => {
  // const {email, username, password} = generateUser()
  const {email, username, password} = generateUser()
  cy.request('POST', '/users', {
    email,
    password,
    username
  }).then(response => ({
    ...response.body.user, 
    password
  }));
})

// Cypress.Commands.add('findByTestId', (value) => {
//   cy.get(`[data-cy=${value}]`);
// })
// Не используется, потому как нет такого селектора

Cypress.Commands.add('login', (email, password) => {
  cy.registerNewUser().then(({ email, password }) => {
    cy.request('POST', 'users/login', {
      user: {
        email,
        password
      }
    }).then((response) => {
      cy.setCookie('drash_sess', response.body.user.token);
    });
  });
});