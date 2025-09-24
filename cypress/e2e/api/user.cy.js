/// <reference types="cypress" />

describe("API Tests - Criação e Autorização de Usuário Aleatório", () => {
  it("Deve criar um usuário aleatório e armazenar dados globalmente", () => {
    cy.log(`Senha Cypress.env: ${Cypress.env("PASSWORD")}`);
    cy.api_createRandomUser().then(({ userName, userID, password }) => {
      cy.log(`Usuário criado: ${userName} ID: ${userID}`);
    });
  });

  it("Deve gerar token de acesso para o usuário criado", () => {
    const userName = Cypress.env("userName");
    const password = Cypress.env("password");

    cy.api_generateToken(userName, password).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.token).to.exist;
      Cypress.env("token", res.body.token);
      cy.log(`Token gerado: ${res.body.token}`);
    });
  });
});
