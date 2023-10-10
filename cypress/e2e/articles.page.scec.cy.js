/// <reference types="cypress" />
import { generateArticle } from '../support/ganerate.articles';

describe('Articless page', () => {
  beforeEach(() => {
    cy.registerAndLogin();
    cy.visit('/editor');
  });

  it('Should not allow creating a new article without article (with only description)', () => {
    //повтори техніку тест дизайну desicion table. Ми не можемо робити перевірки, що
    //артікл не буде зареєстрований лише з одним полем. Навпаки, ми повинні виключати одне поле дя
    //негативних перевірок
    const { description } = generateArticle();
    //винеси це в дескрипшин, ти використовуєш ці дані в кожному тесті - це дублікат коду

    cy.findByPlaceholder('Write your article (in markdown)').type(description);
    cy.clickButWithClass('btn-primary');
    //інший селектор, не клас. Обери тип
    //виправ це всюди
    cy.get('.swal-title').should('contain', 'Oops!');
    //ця перевірка міститься в кількох тестах. Зроби її командою
  });

  it('Should not allow creating a new article without article (with only article)', () => {
    const { article } = generateArticle();

    cy.findByPlaceholder("What's this article about?").type(article);
    cy.clickButWithClass('btn-primary');
    cy.get('.swal-title').should('contain', 'Oops!');
  });

  it('Should allow creating a new article (with only title)', () => {
    //по-ідеї, тільки поле Tags необовязкове. Система не повинна пропестити цього тесту
    //якщо пропускає, то вітаю, ти знайшов баг
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
    //зроби цей тест першим тестом
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


  it ('Should delete an article', () => {
    //якщо ми говоримо про сторінку створення статті - то це тест в цей сьют не підходить
    //цей тест повинен виконуватись на сторінці з конкретною статтею
    const { title, description, article } = generateArticle();

    cy.findByPlaceholder('Article Title').type(title);
    cy.findByPlaceholder('Write your article (in markdown)').type(description);
    cy.findByPlaceholder("What's this article about?").type(article);
    cy.clickButWithClass('btn-primary');
    // винеси це в окрему команду, а ще краще, створи АПІ запит на створення статті (як ти зробив для реєстрації)
    cy.contains('Delete Article').click();
    cy.assertPageUrl('#/');
  });
});

//Загальний висновок для artices page
//1. ПОВТОРИТИ desiciion table - переписати тести
//2. додати тест на те, що стаття може бути опублікована без тегів
//3. зробити позитивний тест на створення статті першим тестом
//4. забрати звідси тест на видалення статті - створити для цього новий файл + в файл додати 
//більше тестів, наприклад, на створення коменту, видалення коменту, редагування коменту, 
//можливості натиснути кнопку - редагувати статтю

