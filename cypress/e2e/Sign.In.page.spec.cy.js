/// <reference types="cypress" />

beforeEach(() => {
cy.visit('/login');
});

describe('Sign In Page', () => {
// Проверяем что при клике на Sign In открывается соответсвующая страница
it('should allow to log in ', () => {
  const {email, username, password} = generateUser()

  cy.request('POST', '/users', {
    email,
    username,
    password
  });
});
});