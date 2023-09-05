/// <reference types="cypress" />
import { generateUser } from '../support/ganagate.users';

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

  it('should have username input', function () {
    cy.findByPlaceholder('Your username').should(
      'have.value',
      this.user.username
    );
  });

  it('Can`t save settings withour username', () => {
    cy.findByPlaceholder('Your username').clear()
    cy.clickButWithClass('btn.btn-lg.btn-primary.pull-xs-right');
    cy.checkSwalText('Username field required.')
  } )

  it('Can`t chose username with space', () => {
    cy.findByPlaceholder('Your username').clear().type(' ')
    cy.checkSwalText('Username field required.')
  })

  it('Can shose usermane', () => {
    const user = generateUser();
    cy.findByPlaceholder('Your username').clear().type(user.username);
    cy.clickButWithClass('btn.btn-lg.btn-primary.pull-xs-right');
    cy.visit('/')
    cy.get(':nth-child(4) > .nav-link').should('contain.text', user.username);    
  } )

  it('Can add bio', () => {
    const bio = 'some text about me'
    cy.findByPlaceholder('Short bio about you').type(bio)
    cy.clickButWithClass('btn.btn-lg.btn-primary.pull-xs-right');
    cy.get('.swal-title').contains('Update successful!');
  })

  //Этот тест фейлится - баг
  it.only('Can choose email with password and login with new data', () => {
    const user = generateUser();
    const newPass = 'Qwerty321'
    
    cy.findByPlaceholder('Email').clear();
    cy.findByPlaceholder('Email').type(user.email);
    // Не понимаю почему, если объеденить в одну команду очистить и ввести ошибка:
    // ailed because the page updated as a result of this command, but you tried to continue the command chain. The subject is no longer attached to the DOM, and Cypress cannot requery the page after commands such as cy.type().   
    cy.findByPlaceholder('Password').type(newPass);
    cy.clickButWithClass('btn.btn-lg.btn-primary.pull-xs-right');
    cy.get('.swal-title').contains('Update successful!');
    cy.clickButWithClass('swal-button.swal-button--confirm');
    cy.clickButWithClass('btn.btn-outline-danger');
    cy.findH1ByText('conduit')
    cy.visit('/login')
    cy.findH1ByText('Sign in')
    cy.findByPlaceholder('Email').type(user.email);
    cy.findByPlaceholder('Password').type(newPass);
    cy.clickButWithClass('btn-lg').then(() => {
      cy.get(':nth-child(4) > .nav-link').should('contain.text', username);
    });
    
  });
  
  
});
