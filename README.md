# PetProjectGit
Проект Cypress с использованием git
Для запуска:
npm install --save-dev @faker-js/faker
npx cypress open

// логин пользователя с помощью интерфейса
//   cy.intercept('POST', '/users/login').as('login') 
//   cy.registerNewUser().then(({email, password}) =>{

//   cy.findByPlaceholder('Email').type(email);

//   cy.findByPlaceholder('Password').type(password + `{Enter}`);

//   });
// // "Якорь" для ожидания события 
//   cy.wait('@login')