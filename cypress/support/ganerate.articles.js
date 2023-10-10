import { faker } from '@faker-js/faker';
//зміни назву файлу, вона прописана з помилкою. Це дуже кидається в очі.
//після зміни назви, не забуть змінити імпорти

function generateArticle() {
  const title = faker.lorem.sentence();
  const description = faker.lorem.paragraph();
  const article = faker.lorem.paragraphs(5);

  return {
    title, // заголовок
    description, // описание
    article, // статъя
  };
}

export default { generateArticle };
