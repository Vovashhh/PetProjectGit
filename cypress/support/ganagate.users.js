import { faker } from '@faker-js/faker';

function generateUser() {
  const username = faker.internet.userName();
  const email = faker.internet.email();
  const password = "Qwerty123"

  return {username, email, password}
}

export default {generateUser}