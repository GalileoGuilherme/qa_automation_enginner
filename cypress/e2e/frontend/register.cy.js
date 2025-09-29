import { faker } from '@faker-js/faker';

describe('Web Tables - demoqa com limpeza', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);
    cy.visit('https://demoqa.com/');
    cy.contains('Elements').click();
    cy.contains('Web Tables').click();
    // cy.limparWebTable();
  });

  it('Cria, edita e deleta um registro', () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const age = faker.number.int({ min: 18, max: 70 }).toString();
    const salary = faker.number.int({ min: 1000, max: 10000 }).toString();
    const department = faker.helpers.arrayElement(['QA', 'Dev', 'Compliance', 'Support']);

    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#userEmail').type(email);
    cy.get('#age').type(age);
    cy.get('#salary').type(salary);
    cy.get('#department').type(department);
    cy.get('#submit').click();

    const novoDepartment = 'Automation';

    cy.contains('div.rt-td', email)
      .parent()
      .find('[id^="edit-record-"]')
      .click();

    cy.get('#department').should('exist').and('not.be.disabled').clear().type(novoDepartment);
    cy.get('#submit').click();

    cy.contains('div.rt-td', email).parent().contains(novoDepartment);

    cy.contains('div.rt-td', email)
      .parent()
      .find('[id^="delete-record-"]')
      .click();

    cy.get('.rt-tbody').should('not.contain', email);
  });

it('Cria, edita e deleta 12 registros na Web Table', () => {
  const emailsCriados = [];

  // Criação dos 12 registros
  for (let i = 0; i < 12; i++) {
    cy.get('#addNewRecordButton').click();

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const age = faker.number.int({ min: 18, max: 70 }).toString();
    const salary = faker.number.int({ min: 1000, max: 10000 }).toString();
    const department = faker.helpers.arrayElement(['QA', 'Dev', 'Compliance', 'Support']);

    emailsCriados.push(email);

    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#userEmail').type(email);
    cy.get('#age').type(age);
    cy.get('#salary').type(salary);
    cy.get('#department').type(department);
    cy.get('#submit').click();
  }

  // Antes de editar/deletar, aumenta as linhas da tabela para garantir visibilidade
  cy.get('select').select('20 rows');

  // Editar todos os registros criados
  const novoDepartment = 'Automation';

  cy.wrap(emailsCriados).each(email => {
    cy.contains('div.rt-td', email, {timeout: 10000}) // aumenta timeout para renderização
      .parent()
      .find('[id^="edit-record-"]')
      .click();

    cy.get('#department').should('exist').and('not.be.disabled').clear().type(novoDepartment);
    cy.get('#submit').click();

    cy.contains('div.rt-td', email).parent().contains(novoDepartment);
  });

  // Deletar todos os registros criados
  cy.wrap(emailsCriados).each(email => {
    cy.contains('div.rt-td', email, {timeout: 10000})
      .parent()
      .find('[id^="delete-record-"]')
      .click();

    cy.get('.rt-tbody').should('not.contain', email);
  });
});

});
