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

  it("Can't save settings without a username", () => {
    cy.findByPlaceholder('Your username').clear();
    cy.clickButWithClass('btn.btn-lg.btn-primary.pull-xs-right');
    cy.checkSwalText('Username field required.');
  });

  it("Can't choose a username with a space", () => {
    cy.findByPlaceholder('Your username').clear().type(' ');
    cy.checkSwalText('Username field required.');
  });

  it('Can choose a new username', () => {
    const user = generateUser();
    cy.findByPlaceholder('Your username').clear().type(user.username);
    cy.clickButWithClass('btn.btn-lg.btn-primary.pull-xs-right');
    cy.visit('/');
    cy.get(':nth-child(4) > .nav-link').should('contain.text', user.username);
  });

  it('Can add a bio', () => {
    const bio = 'Some text about me';
    cy.findByPlaceholder('Short bio about you').type(bio);
    cy.clickButWithClass('btn.btn-lg.btn-primary.pull-xs-right');
    cy.get('.swal-title').contains('Update successful!');
  });

  it('Can change email with a password and login with new data', () => {
    const user = generateUser();
    const newPass = 'Qwerty321';

    cy.findByPlaceholder('Email').clear().type(user.email);
    cy.findByPlaceholder('Password').type(newPass);
    cy.clickButWithClass('btn.btn-lg.btn-primary.pull-xs-right');
    cy.get('.swal-title').contains('Update successful!');
    cy.clickButWithClass('swal-button.swal-button--confirm');
    cy.clickButWithClass('btn.btn-outline-danger');
    cy.findH1ByText('conduit');
    cy.visit('/login');
    cy.findH1ByText('Sign in');
    cy.findByPlaceholder('Email').type(user.email);
    cy.findByPlaceholder('Password').type(newPass);
    cy.clickButWithClass('btn-lg').then(() => {
      cy.get(':nth-child(4) > .nav-link').should('contain.text', user.username);
    });
  });
});
