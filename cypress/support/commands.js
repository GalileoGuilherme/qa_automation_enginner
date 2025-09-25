// cypress/support/commands.js
import 'cypress-plugin-api';

function generateSecurePassword() {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const special = '!@#$%^&*()-_=+';

  const getRandomChar = (str) => str[Math.floor(Math.random() * str.length)];

  let passwordChars = [
    getRandomChar(upper),
    getRandomChar(lower),
    getRandomChar(numbers),
    getRandomChar(special),
  ];

  const allChars = upper + lower + numbers + special;
  while (passwordChars.length < 10) {
    passwordChars.push(getRandomChar(allChars));
  }

  for (let i = passwordChars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [passwordChars[i], passwordChars[j]] = [passwordChars[j], passwordChars[i]];
  }
  return passwordChars.join('');
}

Cypress.Commands.add("api_createRandomUser", () => {
  const randomNum = Math.floor(Math.random() * 100000);
  const randomUserName = `user${randomNum}`;
  const password = generateSecurePassword();

  return cy.api({
    method: "POST",
    url: "/Account/v1/User",
    body: { userName: randomUserName, password },
    failOnStatusCode: false
  }).then((res) => {
    if (res.status === 201 && res.body.userID) {
      Cypress.env("userName", randomUserName);
      Cypress.env("password", password);
      Cypress.env("userID", res.body.userID);
      return {
        userName: randomUserName,
        userID: res.body.userID,
        password
      };
    }
    throw new Error(`Falha ao criar usuário: ${JSON.stringify(res.body)}`);
  });
});

Cypress.Commands.add("api_generateToken", (userName, password) => {
  return cy.api({
    method: "POST",
    url: "/Account/v1/GenerateToken",
    body: { userName, password },
    failOnStatusCode: false
  });
});

Cypress.Commands.add("api_checkAuthorized", (userName, password) => {
  return cy.api({
    method: "POST",
    url: "/Account/v1/Authorized",
    body: { userName, password },
    failOnStatusCode: false
  });
});

Cypress.Commands.add("api_listBooks", () => {
  return cy.api({
    method: "GET",
    url: "/BookStore/v1/Books"
  });
});

Cypress.Commands.add("api_rentBooks", (userId, collectionOfIsbns) => {
  return cy.api({
    method: "POST",
    url: "/BookStore/v1/Books",
    body: {
      userId,
      collectionOfIsbns
    },
    failOnStatusCode: false
  });
});

Cypress.Commands.add("api_deleteUser", (userId) => {
  return cy.api({
    method: "DELETE",
    url: `/Account/v1/User/${userId}`,
    failOnStatusCode: false
  });
});

Cypress.Commands.add("api_getUserDetails", (userId) => {
  return cy.api({
    method: "GET",
    url: `/Account/v1/User/${userId}`,
    failOnStatusCode: false,
  });
});