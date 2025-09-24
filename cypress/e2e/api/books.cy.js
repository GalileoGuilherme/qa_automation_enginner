/// <reference types="cypress" />
import { userName, password } from "../../support/globals";

describe("API Tests - Livros", () => {
  let userId;
  let token;
  let booksAvailable;
  let rentedBooks;

  before(() => {
    cy.api_createUser(userName, password).then((res) => {
      expect(res.status).to.be.oneOf([200, 201]);
      userId = res.body.userID;
    });
    cy.api_generateToken(userName, password).then((res) => {
      expect(res.status).to.eq(200);
      token = res.body.token;
    });
  });

  it("Deve listar livros disponíveis", () => {
    cy.api_listBooks().then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.books).to.be.an("array").and.have.length.gte(2);
      booksAvailable = res.body.books;
    });
  });

  it("Deve alugar dois livros de livre escolha", () => {
    const booksToRent = booksAvailable.slice(0, 2).map((book) => ({
      isbn: book.isbn
    }));

    cy.api_rentBooks(userId, booksToRent).then((res) => {
      expect(res.status).to.eq(201);
      rentedBooks = booksToRent;
    });
  });

  it("Deve listar detalhes do usuário com livros alugados", () => {
    cy.api_getUserDetails(userId).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.books).to.have.length(2);
      expect(res.body.books[0]).to.have.property("isbn", rentedBooks[0].isbn);
      expect(res.body.books[1]).to.have.property("isbn", rentedBooks[1].isbn);
    });
  });

  after(() => {
    cy.api_deleteUser(userId).then((res) => {
      expect(res.status).to.eq(204);
    });
  });
});
