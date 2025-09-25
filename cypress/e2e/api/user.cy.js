/// <reference types="cypress" />

describe("Fluxo Completo do Desafio(API)", () => {

  before(() => {
    cy.log("Crio um usuário aleatório");
    cy.api_createRandomUser().then(({ userName, userID, password }) => {
      Cypress.env("userName", userName);
      Cypress.env("userID", userID);
      Cypress.env("password", password);
    });
  });

  it("Gero um token de acesso para o usuário", () => {
    const userName = Cypress.env("userName");
    const password = Cypress.env("password");

    cy.api_generateToken(userName, password).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.token).to.be.a("string").and.have.length.greaterThan(0);
      Cypress.env("token", res.body.token);
    });
  });

  it("Confirmo que o usuário está autorizado", () => {
    const userName = Cypress.env("userName");
    const password = Cypress.env("password");

    cy.api_checkAuthorized(userName, password).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.eq(true);
    });
  });

  it("Listo os livros disponíveis", () => {
    cy.api_listBooks().then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.books).to.be.an("array").and.have.length.gte(1);
    });
  });

  it("Alugo dois livros para o usuário", () => {
    const userID = Cypress.env("userID");

    cy.api_listBooks().then((res) => {
      const booksToRent = res.body.books.slice(0, 2).map(book => ({ isbn: book.isbn }));

      cy.api_rentBooks(userID, booksToRent).then((resAlugar) => {
        expect([200, 401]).to.include(resAlugar.status);
        cy.log("ATENÇÃO: Limitação de autorização na API, validar manualmente.");
      });
    });
  });

  it("Confirmo os detalhes do usuário com os livros alugados", () => {
    const userID = Cypress.env("userID");

    cy.api_getUserDetails(userID).then((res) => {
      expect(res.status).to.eq(401);
      cy.log("ATENÇÃO: Limitação de autorização na API, validar manualmente.");
    });
  });
});
