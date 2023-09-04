/// <reference types="cypress" />

describe('Settings page', () => {

beforeEach(() => {
  cy.visit('/login');
// Логин с помщью передачи куки (только запросами) через кастомную команду
  cy.login();
  cy.visit('/settings');
});

  it('Should have a correct title', () => {

  });

})