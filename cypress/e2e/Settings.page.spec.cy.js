/// <reference types="cypress" />
import { generateUser } from '../support/ganagate.users';

describe('Settings Page', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.registerAndLogin().as('user');
    cy.visit('/settings');
  });

  it('Should display the correct title', () => {
    cy.findH1ByText('Your Settings');
  });

  it('Should display the username input with pre-filled value', function () {
    cy.findByPlaceholder('Your username').should(
      'have.value',
      this.user.username
    );
  });
  //рекомендую об'єднати 2 перших it. Перевір наявні елементи (поля, кнопки) одним it.
  //Далі, так як ти і робиш, варто прописати тести на зміну даних у полях

  it("Can't save settings without a username", () => {
    const update = 'btn.btn-lg.btn-primary.pull-xs-right';
    //варто використати інший селектор. Цей надто довгий і зовсім незрозуміло, що
    //собою являє
    cy.findByPlaceholder('Your username').clear();
    cy.clickButWithClass(update);
    cy.checkSwalText('Username field required.');
  });

  it("Can't choose a username with a space", () => {
    //choose чи change? Зміни всюди, де треба. 
    //Також раджу трішки перефразувати самарі, щоб воно було логічним продовженням describe
    // теж зміни це всюди
    cy.findByPlaceholder('Your username').clear().type(' ');
    cy.checkSwalText('Username field required.');
  });

  it('Can choose a new username', () => {
    const user = generateUser();
    const update = 'btn.btn-lg.btn-primary.pull-xs-right';
    cy.findByPlaceholder('Your username').clear().type(user.username);
    cy.clickButWithClass(update);
    cy.visit('/');
    cy.get(':nth-child(4) > .nav-link').should('contain.text', user.username);
  });

  it('Can add a bio', () => {
    const bio = 'Some text about me';
    const update = 'btn.btn-lg.btn-primary.pull-xs-right';
    cy.findByPlaceholder('Short bio about you').type(bio);
    cy.clickButWithClass(update);
    cy.get('.swal-title').contains('Update successful!');
    //винеси це в окрему функцію. Ти робиш цю перевірку кілька разів - дублюєш код
  });

  it('Can change email with a password and login with new data', () => {
    //варто зробити окремі тести на зміну емейлу та зміну паролю. Тоді в тесті логінитись з новим паролем
    //та новим емейлом окремо
    const user = generateUser();
    const newPass = 'Qwerty321';
    const update = 'btn.btn-lg.btn-primary.pull-xs-right';

    cy.findByPlaceholder('Email').clear().type(user.email);
    cy.findByPlaceholder('Password').type(newPass);
    cy.clickButWithClass(update);
    cy.get('.swal-title').contains('Update successful!');
    cy.clickButWithClass(update);
    cy.clickButWithClass('btn.btn-outline-danger');
    //зміни селектор, незрозуміло, що ти клікаєш
    cy.findH1ByText('conduit');

    cy.visit('/login');
    cy.findH1ByText('Sign in');
    cy.findByPlaceholder('Email').type(user.email);
    cy.findByPlaceholder('Password').type(newPass);
    cy.clickButWithClass('btn-lg').then(() => {
      cy.get(':nth-child(4) > .nav-link').should('contain.text', user.username);
    });
    //було б круто використати окрему команду на логін
  });
});
