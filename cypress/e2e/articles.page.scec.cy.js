/// <reference types="cypress" />
import { generateArticle } from '../support/ganerate.articles';

describe('Articless page', () => {
  beforeEach(() => {
    cy.registerAndLogin();
    cy.visit('/editor');
  });

  it('Should not allow creating a new article without article (with only description)', () => {
    const { description } = generateArticle();

    cy.findByPlaceholder('Write your article (in markdown)').type(description);
    cy.clickButWithClass('btn-primary');
    cy.get('.swal-title').should('contain', 'Oops!');
  });

  it('Should not allow creating a new article without article (with only article)', () => {
    const { article } = generateArticle();

    cy.findByPlaceholder("What's this article about?").type(article);
    cy.clickButWithClass('btn-primary');
    cy.get('.swal-title').should('contain', 'Oops!');
  });

  it('Should allow creating a new article (with only title)', () => {
    const { title } = generateArticle();
    const expectedSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    -cy.findByPlaceholder('Article Title').type(title);
    cy.clickButWithClass('btn-primary');
    cy.assertPageUrl(`/#/articles/${expectedSlug}`);

    // Проверка что есть на главной странице
    cy.visit('/');
    cy.get('div.article-preview').should('contain', title);
  });

  it('Should allow creating a new article', () => {
    const { title, description, article } = generateArticle();
    const expectedSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    -cy.findByPlaceholder('Article Title').type(title);
    cy.findByPlaceholder('Write your article (in markdown)').type(description);
    cy.findByPlaceholder("What's this article about?").type(article);

    cy.clickButWithClass('btn-primary');
    cy.assertPageUrl(`/#/articles/${expectedSlug}`);
  });

  it('Should delete an article', () => {
    const { title, description, article } = generateArticle();

    cy.findByPlaceholder('Article Title').type(title);
    cy.findByPlaceholder('Write your article (in markdown)').type(description);
    cy.findByPlaceholder("What's this article about?").type(article);

    cy.clickButWithClass('btn-primary');
    cy.contains('Delete Article').click();
    cy.assertPageUrl('#/');
  });
});
