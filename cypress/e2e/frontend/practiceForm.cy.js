import { faker } from '@faker-js/faker';

describe('E2E Practice Form - DemoQA', () => {
  it('Executa fluxo completo do Practice Form', () => {
    Cypress.on('uncaught:exception', () => false);

    cy.visit('https://demoqa.com/');
    cy.url().should('eq', 'https://demoqa.com/');
    cy.get('header > a > img').should('be.visible');
    cy.contains('Forms').should('exist');

    cy.contains('Forms').click();
    cy.url().should('include', '/forms');

    cy.get('.element-list').contains('Practice Form').click();
    cy.url().should('include', '/automation-practice-form');

    const statesAndCities = {
      NCR: ['Delhi', 'Gurgaon', 'Noida'],
      'Uttar Pradesh': ['Agra', 'Lucknow', 'Merrut'],
      Haryana: ['Karnal', 'Panipat'],
      Rajasthan: ['Jaipur', 'Jaiselmer']
    };
    const state = faker.helpers.arrayElement(Object.keys(statesAndCities));
    const city = faker.helpers.arrayElement(statesAndCities[state]);

    const randomData = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      gender: faker.helpers.arrayElement(['Male', 'Female', 'Other']),
      phone: faker.string.numeric('##########'), // 10 dígitos para funcionar no DemoQA
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
      state,
      city
    };

    cy.fillPracticeForm(randomData);

    // Aguardar modal abrir e validar campos
    cy.get('.modal-content').should('be.visible');
    cy.get('#example-modal-sizes-title-lg').should('have.text', 'Thanks for submitting the form');
    cy.get('.table-responsive').should('be.visible');

    // Validações dos dados enviados(dialog)
    cy.get('td').contains('Student Name').next('td')
      .should('have.text', `${randomData.firstName} ${randomData.lastName}`);
    cy.get('td').contains('Student Email').next('td')
      .should('have.text', randomData.email);
    const genderFormatted = randomData.gender.charAt(0).toUpperCase() + randomData.gender.slice(1).toLowerCase();
    cy.get('td').contains('Gender').next('td')
      .should('have.text', genderFormatted);
    cy.get('td').contains('Mobile').next('td')
      .should('have.text', randomData.phone);
    const dateFormatted = `${randomData.birthDay} ${randomData.birthMonth},${randomData.birthYear}`;
    cy.get('td').contains('Date of Birth').next('td')
      .should('have.text', dateFormatted);
    cy.get('td').contains('Subjects').next('td')
      .should('have.text', randomData.subject);
    const hobbiesMap = { 1: 'Sports', 2: 'Reading', 3: 'Music' };
    cy.get('td').contains('Hobbies').next('td')
      .should('have.text', hobbiesMap[randomData.hobbyIndex]);
    cy.get('td').contains('Picture').next('td')
      .should('have.text', 'arquivo_upload.txt');
    cy.get('td').contains('Address').next('td')
      .should('have.text', randomData.address);
    cy.get('td').contains('State and City').next('td')
      .should('have.text', `${randomData.state} ${randomData.city}`);

    // Fechar modal
    cy.closePracticeFormModal();
    // cy.get('#closeLargeModal').click();
    // cy.get('.modal-content').should('not.exist');
  });
});
