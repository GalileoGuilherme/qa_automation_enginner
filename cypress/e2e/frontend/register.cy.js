import { faker } from '@faker-js/faker';

describe('Web Tables - criação, edição e exclusão de registros', () => {
    beforeEach(() => {
        Cypress.on('uncaught:exception', () => false);
        cy.visit('https://demoqa.com/');
        cy.contains('Elements').click();
        cy.contains('Web Tables').click();
    });

    it('Cria, edita e deleta um registro', () => {
        const record = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            age: faker.number.int({ min: 18, max: 70 }).toString(),
            salary: faker.number.int({ min: 1000, max: 10000 }).toString(),
            department: faker.helpers.arrayElement(['QA', 'Dev', 'Compliance', 'Support'])
        };

        cy.addWebTableRecord(record);
        cy.editWebTableRecord(record.email, 'Automation');
        cy.deleteWebTableRecord(record.email);
    });

    it('Cria, edita e deleta 12 registros', () => {
        const emailsCriados = [];

        for (let i = 0; i < 12; i++) {
            const record = {
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                age: faker.number.int({ min: 18, max: 70 }).toString(),
                salary: faker.number.int({ min: 1000, max: 10000 }).toString(),
                department: faker.helpers.arrayElement(['QA', 'Dev', 'Compliance', 'Support'])
            };

            emailsCriados.push(record.email);
            cy.addWebTableRecord(record);
        }

        cy.get('select').select('20 rows');

        emailsCriados.forEach(email => {
            cy.editWebTableRecord(email, 'Automation');
            cy.deleteWebTableRecord(email);
        });
    });
});
