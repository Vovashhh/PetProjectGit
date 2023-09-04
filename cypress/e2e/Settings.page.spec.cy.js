/// <reference types="cypress" />

describe('Settings page', () => {

beforeEach(() => {
  cy.visit('/login');

// Логин с помщью передачи куки (только запросами)
cy.registerNewUser().then(({email, password}) => {
  cy.request('POST', 'users/login', {
    user: {
      email,
      password
    }
  }).then((response) => {
    cy.setCookie('drash_sess', response.body.user.token)
  })
})

// логин пользователя с помощью интерфейса
//   cy.intercept('POST', '/users/login').as('login') 
//   cy.registerNewUser().then(({email, password}) =>{

//   cy.findByPlaceholder('Email').type(email);

//   cy.findByPlaceholder('Password').type(password + `{Enter}`);

//   });
// // "Якорь" для ожидания события 
//   cy.wait('@login')

//   cy.visit('/settings');
});

  it('Should have a correct title', () => {

  });

})