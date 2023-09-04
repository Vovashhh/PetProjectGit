/// <reference types="cypress" />

describe('Settings page', () => {
  beforeEach(() => {
    cy.visit('/login');

    cy.registerNewUser()
      .then((user) => {
        cy.login(user).then(() => user);
      })
      .as('user');

    cy.visit('/settings');
  });

  it('Should have a correct title', () => {
    cy.findH1ByText('Your Settings');
  });

  it('should have email input', function () {
    cy.findByPlaceholder('Your username').should(
      'have.value',
      this.user.username
    );
  });
});
