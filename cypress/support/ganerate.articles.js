import { faker } from '@faker-js/faker';

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