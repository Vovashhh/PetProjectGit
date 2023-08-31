/// <reference types="cypress" />

beforeEach(() => {
  cy.visit('/');
});

describe('My home page', () => {
  it('should have all parts', () => {
    // Проверяем что мы перешли на страницу 
    cy.get('h1').should('contain.text', 'conduit');
    
    // Проверяем что есть Global Feed 
    cy.contains('a', 'Global Feed').should('be.visible');
    
    // Проверяем что в сайдбаре есть указанный текст
    cy.contains('.sidebar', 'Popular Tags').should('be.visible');
  });

  it('should click on Sign in', () => {
    // Проверяем что можно перейти на страницу логина
    cy.contains('a', 'Sign in').click();
    cy.url().should('include', '/login');
    cy.get('h1').should('contain.text', 'Sign in');
  });

  it('should click on Sign up', () => {
    // Проверяем что можно перейти на страницу регистрации
    cy.contains('a', 'Sign up').click();
    cy.url().should('include', '/register');
    cy.get('h1').should('contain.text', 'Sign up');
  });
});
