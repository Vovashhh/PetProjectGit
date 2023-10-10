/// <reference types="cypress" />

beforeEach(() => {
  cy.visit('/login');
});
//внеси в дескрайб.

describe('Sign In Page', () => {
  it('should allow to log in ', () => {
    //трішки уточни самарі тесту, бо бачу наступний тест практично такий самий, але 
    //з самарі незрозуміло в чому різниця
    cy.findH1ByText('Sign in');
    cy.registerNewUser().then(({ email, password, username }) => {
      //в кожному тесті ти використовуєш функцію registerNewUser. Спробуй винести її
      //в beforeEach
      cy.findByPlaceholder('Email').type(email);
      cy.findByPlaceholder('Password').type(password);
      cy.clickButWithClass('btn');

      cy.get(':nth-child(4) > .nav-link').should('contain.text', username);
      //чи можливо вибрати інший селектор? наприклад, href? якщо можливо, то зроби так)
      //виправ в наступних тестах
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
      //так як текст помилки використовується декілька раз - рекомендую винести його в змінну
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
