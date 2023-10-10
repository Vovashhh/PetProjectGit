/// <reference types="cypress" />

const { generateUser } = require('../support/ganagate.users');

beforeEach(() => {
  cy.visit('/register');
});
//внеси beforeEach в describe.  Якби в тебе було декілька дескрайбів, 
//то можна було б винести beforeEach, але так як в тебе describe один, 
//то цього робити не варто.

describe('Sign Up page', () => {
  it('should register user', () => {
    const { email, username, password } = generateUser();
    // винеси цей блок з кодного it в beforeEach - це допоможе уникнути дублюання коду 

    cy.findH1ByText('Sign up');
    cy.findByPlaceholder('Username').type(username);

    cy.findByPlaceholder('Email').type(email);

    cy.findByPlaceholder('Password').type(password);

    cy.clickButWithClass('btn');
    //раджу вибрати інший селектор для кнопки. Цей надто неунікальний.
    //Бачу, що в Elements є type="submit" - найоптимальніше буде обрати його селектором,
    //оскільки назва кнопки забагована
    //ВИПРАВ ЦЮ Ж ПОМИЛКУ В ІНШИХ МІСЦЯХ

    cy.checkSwalText('Your registration was successful!');
    // окрім перевірки поп-апу, можна зробити більше тестів. Наприклад, після успішної реєстрації
    //користувача повинно залогінити. Перевір, чи дійсно це так. Чи дійсно ім`я користувача
    //відображається в правому верхньому куті, на яку сторінку редіректить користувача - перевір url,
    //також можна переконатись, що користувач дійсно на домашній сторінці, звіривши чи видно 
    //global feed та your feed
  });

  it('User cannot register with the password without numbers', () => {
    //зверни увагу на назву тестів. Вони є логічним продовженням describe.
    //Зараз твій тест звучить як "Sign Up page User cannot register with the password without numbers".
    //поправ це всюди, де треба
    const { email, username } = generateUser();

    cy.findH1ByText('Sign up');

    cy.findByPlaceholder('Username').type(username);

    cy.findByPlaceholder('Email').type(email);

    cy.findByPlaceholder('Password').type('Qwertyqwe + `{enter}`');
    //рекомендую згенерувати рандомні дані в змінну 
    //і саму змінну використати замість Qwertyqwe
    //виправ таку ж помилку для подібних тестів

    // cy.clickButWithClass('btn') - чому тут закоментовано? Або тисни Enter, або клікай
    //кнопку - не додавай зайвого коду

    cy.checkSwalText(
      'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.'
    );
    //цей велиииикий текст також можна винести в змінну перед усіма тестами. ти ж використовуєш його 
    //декілька разів в своїх тестах. У випадку, якщо зміниться текст помилку, тобі легше буде
    //поправити текст для одної змінної, аніж шукати його в десятках тестів
  });

  it('Can`t register without 1 uppercase letter', () => {
    const { email, username } = generateUser();

    cy.findH1ByText('Sign up');

    cy.findByPlaceholder('Username').type(username);

    cy.findByPlaceholder('Email').type(email);

    cy.findByPlaceholder('Password').type('qwerty123 + `{enter}`');
    //окрема змінна

    cy.checkSwalText(
      'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.'
    );
    //окрема змінна
  });

  it('Can`t register with short password', () => {
    //short passwort - uоворить нам рівно нічого про тест дату. Що означає short password?
    //використай техніки тест дизайну, якщо конкретно, техніку граничних значень.
    //саме у цьому кейсі слід перевірити іншу кількість символів
    const { email, username } = generateUser();

    cy.findH1ByText('Sign up');

    cy.findByPlaceholder('Username').type(username);

    cy.findByPlaceholder('Email').type(email);

    cy.findByPlaceholder('Password').type('1qW');
    //окрема змінна

    cy.clickButWithClass('btn');

    cy.checkSwalText(
      'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.'
    );
    //окрема змінна
  });

  it('Can`t register without 1 lowercase letter', () => {
    const { email, username } = generateUser();

    cy.findH1ByText('Sign up');

    cy.findByPlaceholder('Username').type(username);

    cy.findByPlaceholder('Email').type(email);

    cy.findByPlaceholder('Password').type('QWER1234543 + `{enter}`');
    //окрема змінна для паролю

    cy.checkSwalText(
      'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.'
    );
    //окрема змінна
  });

  it('Should not allow with 2 simle Email', () => {
    //simle? - виправ назву тесту

    cy.registerNewUser().then(({ email, username, password }) => {
      //не треба then після викликаної функції registerNewUser
      //продовжуй писати тест не у функції
      //в ідеалі твій тест мав би виглядати так
      /*cy.registerNewUser()
      cy.findByPlaceholder('Username').type(username);
      cy.findByPlaceholder('Email').type(email);
      cy.findByPlaceholder('Password').type(password + `{enter}`);
      cy.checkSwalText('Email already taken.');*/

      cy.findByPlaceholder('Username').type(username);

      cy.findByPlaceholder('Email').type(email);

      cy.findByPlaceholder('Password').type(password + `{enter}`);

      cy.checkSwalText('Email already taken.');
    });
  });

  it('can`t register user with invalid email', () => {
    //що маєш на увазі під invalid email? - так не можна писати в тесті. Незрозуміло,
    //яку тест дату тестуєш. Зміни назву тесту. Наприклад,
    //"can`t register user with email without @ symbol"
    const { username, password } = generateUser();

    cy.findH1ByText('Sign up');

    cy.get('[placeholder=Username]').type(username);
    //ти ж маєш кастомну команду - findByPlaceholder. Використай її

    cy.get('[placeholder=Email]').type('email.com.ua');
    //кастомна команда

    cy.get('[placeholder=Password]').type(password);
    //кастомна команда

    cy.clickButWithClass('btn');
    //змінити селектор

    cy.checkSwalText('Email must be a valid email.');
    //там точно така помилка?
  });

  it('should not register whithout email', () => {
    //should not register USER without email
    const { username, password } = generateUser();

    cy.findByPlaceholder('Username').type(username);

    cy.findByPlaceholder('Password').type(password);

    cy.clickButWithClass('btn');
    //зміни селектор

    cy.checkSwalText('Email field required.');
  });

  it('should not register whithout Username', () => {
    //should not register USER without username
    const { email, password } = generateUser();

    cy.findByPlaceholder('Email').type(email);

    cy.findByPlaceholder('Password').type(password);

    cy.clickButWithClass('btn');
    //зміни селектор

    cy.checkSwalText('Username field required.');
  });

  it('should not register whithout Password', () => {
    //should not register USER without password
    const { email, username } = generateUser();

    cy.findByPlaceholder('Email').type(email);

    cy.findByPlaceholder('Username').type(username);

    cy.clickButWithClass('btn');
    //зміни селектор

    cy.checkSwalText('Password field required.');
  });

  it('User can use Enter 2 work with form', () => {
    //не зрозуміла суті цього тесту. Чим він відрізняється від першого тесту в цьому дескрайбі?
    const { email, username, password } = generateUser();

    cy.get('h1').should('contain.text', 'Sign up');

    cy.findByPlaceholder('Username').type(username);

    cy.findByPlaceholder('Email').type(email);

    cy.findByPlaceholder('Password').type(password + `{Enter}`);

    cy.checkSwalText('Your registration was successful!');
  });
});
