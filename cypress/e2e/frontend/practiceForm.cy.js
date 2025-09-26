import { faker } from '@faker-js/faker';

describe('E2E Practice Form', () => {

  it('Executa fluxo completo do Practice Form', () => {
    // Ignora erros não tratados para não falhar o teste por problemas externos
    Cypress.on('uncaught:exception', () => false);

    // Passo 1: visita a home, checando URL e elementos básicos
    cy.visit('/');
    cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
    cy.get('header > a > img').should('be.visible');
    cy.contains('Forms').should('exist');

    // Passo 2: navega clicando na opção Forms do card inicial
    cy.contains('Forms').click();
    cy.url().should('include', '/forms');

    // Passo 3: clica em Practice Form no menu lateral
    cy.get('.element-list').contains('Practice Form').click();
    cy.url().should('include', '/automation-practice-form');

    // Passo 4: escolhe nome aleatório de estado e uma cidade válida correspondente
    const statesAndCities = {
      NCR: ['Delhi', 'Gurgaon', 'Noida'],
      'Uttar Pradesh': ['Agra', 'Lucknow', 'Merrut'],
      Haryana: ['Karnal', 'Panipat'],
      Rajasthan: ['Jaipur', 'Jaiselmer'],
    };

    // sortear estado e cidade
    const state = faker.helpers.arrayElement(Object.keys(statesAndCities));
    const city = faker.helpers.arrayElement(statesAndCities[state]);

    // Passo 5: gera dados aleatórios para preencher o formulário
    const randomData = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      gender: faker.helpers.arrayElement(['Male', 'Female', 'Other']),
      phone: faker.string.numeric('##########'), // número com 10 dígitos
      birthYear: faker.date.birthdate({ min: 1970, max: 2006, mode: 'year' }).getFullYear().toString(),
      birthMonth: faker.helpers.arrayElement([
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]),
      birthDay: faker.number.int({ min: 10, max: 28 }).toString(),
      subject: faker.helpers.arrayElement(['Maths', 'Physics', 'History']),
      hobbyIndex: faker.helpers.arrayElement([1, 2, 3]),
      filePath: 'cypress/fixtures/student.jpg', // arquivo para upload
      address: faker.location.streetAddress(),
      state,
      city,
    };

    // Passo 6: preenche o formulário com os dados gerados
    cy.fillPracticeForm(randomData);

    // Passo 7: aguarda modal aparecer após envio e valida elementos visuais básicos
    cy.get('.modal-content').should('be.visible');
    cy.get('#example-modal-sizes-title-lg').should('have.text', 'Thanks for submitting the form');
    cy.get('.table-responsive').should('be.visible');

    // Passo 8: valida que os dados exibidos no modal correspondem aos inputs fornecidos

    // Validação do nome completo do estudante
    cy.get('td').contains('Student Name').next('td').should('have.text', `${randomData.firstName} ${randomData.lastName}`);

    // Validação do email
    cy.get('td').contains('Student Email').next('td').should('have.text', randomData.email);

    // Formatação correta do gênero para caixa alta na primeira letra
    const genderFormatted = randomData.gender.charAt(0).toUpperCase() + randomData.gender.slice(1).toLowerCase();
    cy.get('td').contains('Gender').next('td').should('have.text', genderFormatted);

    // Validação do telefone celular
    cy.get('td').contains('Mobile').next('td').should('have.text', randomData.phone);

    // Formato esperado para a data de nascimento
    const dateFormatted = `${randomData.birthDay} ${randomData.birthMonth},${randomData.birthYear}`;
    cy.get('td').contains('Date of Birth').next('td').should('have.text', dateFormatted);

    // Validação da matéria
    cy.get('td').contains('Subjects').next('td').should('have.text', randomData.subject);

    // Conversão do índice do hobby para seu respectivo texto
    const hobbiesMap = { 1: 'Sports', 2: 'Reading', 3: 'Music' };
    cy.get('td').contains('Hobbies').next('td').should('have.text', hobbiesMap[randomData.hobbyIndex]);

    // Nome do arquivo enviado no upload
    cy.get('td').contains('Picture').next('td').should('have.text', 'student.jpg');

    // Endereço completo
    cy.get('td').contains('Address').next('td').should('have.text', randomData.address);

    // Estado e cidade concatenados separados por espaço
    cy.get('td').contains('State and City').next('td').should('have.text', `${randomData.state} ${randomData.city}`);

    // Passo 9: fecha o modal para finalizar o teste
    // cy.get('#closeLargeModal').click();
    // cy.get('.modal-content').should('not.exist');

    cy.closePracticeFormModal();

  });
});
