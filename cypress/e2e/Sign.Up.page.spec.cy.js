/// <reference types="cypress" />

const { generateUser } = require("../support/ganagate.users");

beforeEach(() => {
cy.visit('/register');
});

describe('Sign Up page', () => {


it('should register user', () => {
    
  const {email, username, password} = generateUser()

  cy.get('h1').should('contain.text', 'Sign up');

  cy.findByPlaceholder('Username').type(username);

  cy.findByPlaceholder('Email').type(email);

  cy.findByPlaceholder('Password').type(password);

  cy.get('.btn').click();

  cy.get('.swal-text').should('contain.text', 'Your registration was successful!');

  // cy.assertPageUrl('/')

});

it('Can`t register with password without number', () => {
    
  const {email, username, password} = generateUser()

  cy.get('h1').should('contain.text', 'Sign up');

  cy.findByPlaceholder('Username').type(username);

  cy.findByPlaceholder('Email').type(email);

  cy.findByPlaceholder('Password').type('Qwertyqwe');

  cy.get('.btn').click();

  cy.get('.swal-text')
    .should('contain.text', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
  });

it('Can`t register without 1 uppercase letter', () => {
    
  const {email, username, password} = generateUser()

  cy.get('h1').should('contain.text', 'Sign up');

  cy.findByPlaceholder('Username').type(username);

  cy.findByPlaceholder('Email').type(email);

  cy.findByPlaceholder('Password').type('qwerty123');

  cy.get('.btn').click();

  cy.get('.swal-text')
    .should('contain.text', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
});

it('Can`t register with short password', () => {

  const {email, username, password} = generateUser()

  cy.get('h1').should('contain.text', 'Sign up');

  cy.findByPlaceholder('Username').type(username);

  cy.findByPlaceholder('Email').type(email);

  cy.findByPlaceholder('Password').type('123qW');

  cy.get('.btn').click();

  cy.get('.swal-text')
    .should('contain.text', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
});

it('Can`t register without 1 lowercase letter', () => {
    
  const {email, username, password} = generateUser()

  cy.get('h1').should('contain.text', 'Sign up');

  cy.findByPlaceholder('Username').type(username);

  cy.findByPlaceholder('Email').type(email);

  cy.findByPlaceholder('Password').type('QWER1234543');

  cy.get('.btn').click();

  cy.get('.swal-text')
    .should('contain.text', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
});

it('Should not allow with 2 simle Email', () => {
    
  cy.registerNewUser().then(({email, username, password}) => {

    cy.findByPlaceholder('Username').type(username);

  cy.findByPlaceholder('Email').type(email);

  cy.findByPlaceholder('Password').type(password);

  cy.get('.btn').click();

  cy.get('.swal-text').should('contain.text', 'Email already taken.');

  })


})

it('can`t register user with invalid email', () => {
    
const {email, username, password} = generateUser()

  cy.get('h1').should('contain.text', 'Sign up');

  cy.get('[placeholder=Username]').type(username);

  cy.get('[placeholder=Email]').type('email.com.ua');

  cy.get('[placeholder=Password]').type(password);

  cy.get('.btn').click();

  cy.get('.swal-text')
    .should('contain.text', 'Email must be a valid email.');
});

it('should not register whithout email', () => {

const {username, password} = generateUser()

  cy.findByPlaceholder('Username').type(username);

  cy.findByPlaceholder('Password').type('password');

  cy.get('.btn').click();

  cy.get('.swal-text').should('contain.text', 'Email field required.');
 
});

it('should not register whithout email', () => {

const {email, password} = generateUser()
  
  cy.findByPlaceholder('Email').type(email);

  cy.findByPlaceholder('Password').type('password');

  cy.get('.btn').click();

  cy.get('.swal-text').should('contain.text', 'Username field required.');
   
});

it('should not register whithout email', () => {

const {email, username} = generateUser()
    
  cy.findByPlaceholder('Email').type(email);

  cy.findByPlaceholder('Username').type('username');

  cy.get('.btn').click();

  cy.get('.swal-text').should('contain.text', 'Password field required.');
     
});

it('User can use Tab and Enter 2 work with form', () => {

  const {email, username} = generateUser()
      
    cy.findByPlaceholder('Email').type(email);
  
    cy.findByPlaceholder('Username').type('username');
  
    cy.get('.btn').click();
  
    cy.get('.swal-text').should('contain.text', 'Password field required.');
       
  });

});    