import { faker } from '@faker-js/faker';

describe('E2E Practice Form - DemoQA', () => {
  it('Executa fluxo completo do Practice Form', () => {
    // Handler local para ignorar errors cross-origin (scripts externos)
    Cypress.on('uncaught:exception', () => false);

    // Passo 1: Acessar o site
    cy.visit('https://demoqa.com/');
    cy.url().should('eq', 'https://demoqa.com/');
    cy.get('header > a > img').should('be.visible');
    cy.contains('Forms').should('exist');

    // Passo 2: Escolher a opção Forms no card do início
    cy.contains('Forms').click();
    cy.url().should('include', '/forms');

    // Passo 3: Clicar no submenu lateral "Practice Form"
    cy.get('.element-list').contains('Practice Form').click();
    cy.url().should('include', '/automation-practice-form');

    // Passo 4: Preencher o formulário com dados aleatórios gerados via faker
    const randomData = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      gender: faker.helpers.arrayElement(['Male', 'Female', 'Other']),
      phone: faker.string.numeric('55819########'),
      birthYear: faker.date.birthdate({ min: 1970, max: 2006, mode: 'year' }).getFullYear().toString(),
      birthMonth: faker.helpers.arrayElement([
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ]),
      birthDay: faker.number.int({ min: 10, max: 28 }).toString(),
      subject: faker.helpers.arrayElement(['Maths', 'Physics', 'History']),
      hobbyIndex: faker.helpers.arrayElement([1, 2, 3]),
      filePath: 'cypress/fixtures/arquivo_upload.txt',
      address: faker.location.streetAddress(),
      state: 'NCR',
      city: 'Delhi'
    };

    cy.fillPracticeForm(randomData);

    // Para próximos passos (submissão/validação), implemente após confirmar o preenchimento
  });
});
