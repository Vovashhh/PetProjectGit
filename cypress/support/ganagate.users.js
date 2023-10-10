import { faker } from '@faker-js/faker';
//зміни назву файлу, вона прописана з помилкою. Це дуже кидається в очі.
//після зміни назви, не забуть змінити імпорти

function generateUser() {
  const username = faker.internet.userName();
  const email = faker.internet.email();
  const password = 'Qwerty123';

  return { username, email, password };
}

export default { generateUser };
