/// <reference types="cypress" />


describe('Articless page', () => {
  beforeEach(() => {
    cy.registerAndLogin()
    cy.visit('/editor')
  })

  it('Should allow creating a new article', () => {
    cy.findByPlaceholder('Article Title').type('First Article')
    cy.clickButWithClass('btn-primary');
    cy.assertPageUrl('/#/articles/first-article')

    // cy.visit('/')
    // cy.findByCss('div.article-preview').should('contain text', 'First Article');


  })
})