/// <reference types="cypress" />

beforeEach(() => {
  cy.visit('/');
});
//внеси в дескрайб

describe('It should have a title', () => {
  //зміни назву дескрайбу на "Home page"
  it('should have all parts', () => {
    //ти перевіряєш лише один текст. Або зміни назву тесту, або додай більше перевірок
    cy.findH1ByText('conduit');
  });

  it('Verify the Presence of Global Feed Section', () => {
    cy.contains('a', 'Global Feed').should('be.visible');
  });

  it('Verify the Presence of Popular Tags Section', () => {
    cy.contains('.sidebar', 'Popular Tags').should('be.visible');
  });

  it('Click on Sign in', () => {
    cy.contains('a', 'Sign in').click();
    cy.assertPageUrl('/#/login');
    cy.findH1ByText('Sign in');
  });

  it('Click on Sign up', () => {
    cy.contains('a', 'Sign up').click();
    cy.assertPageUrl('/#/register');
    cy.findH1ByText('Sign up');
  });
});
// в загальному замало перевірок. Ти можеж зробити 2 it блоки. В одному описати,
//що повинно відображатись для залогіненого користувача, в іншому для незалогіненого користувача.
//там же ж велика різниця)