describe('E2E Practice Form - DemoQA', () => {
  it('Executa fluxo completo do Practice Form', () => {
    // Passo 1: Acessar o site
    cy.visit('https://demoqa.com/');
    cy.url().should('eq', 'https://demoqa.com/');
    cy.get('header > a > img').should('be.visible');
    cy.contains('Forms').should('exist');

    // Passo 2: Escolher a opção Forms
    cy.contains('Forms').click();
    cy.url().should('include', '/forms');

    // Passo 3: Clicar no submenu Practice Form
    cy.get(':nth-child(2) > :nth-child(1) > .card-body > h5').click();
    cy.url().should('include', '/practice-form');

    // Passo 4: Preencher o formulário com valores aleatórios (exemplo fixo aqui)
    cy.get('#firstName').type('João');
    cy.get('#lastName').type('Silva');
    cy.get('#userEmail').type('joao.silva@example.com');
    cy.get('input[name="gender"][value="Male"]').check({ force: true });
    cy.get('#userNumber').type('5581991432221');
    cy.get('#dateOfBirthInput').click();
    cy.get('.react-datepicker__year-select').select('1996');
    cy.get('.react-datepicker__month-select').select('January');
    cy.get('.react-datepicker__day--001').click();
    cy.get('.subjects-auto-complete__value-container').type('Maths{enter}');
    cy.get('#hobbies-checkbox-1').parent().click();
    cy.get('#uploadPicture').selectFile('cypress/fixtures/arquivo_upload.txt');
    cy.get('#currentAddress').type('Rua Exemplo, 123');
    cy.get('#state').click();
    cy.contains('.css-26l3qy-menu', 'NCR').click();
    cy.get('#city').click();
    cy.contains('.css-26l3qy-menu', 'Delhi').click();

    // Passo 5: Submeter o formulário
    cy.get('#submit').click();

    // Passo 6: Garantir que o popup foi aberto
    cy.contains('Thanks for submitting the form').should('be.visible');

    // Passo 7: Fechar o popup
    cy.get('#closeLargeModal').click();
    cy.get('#closeLargeModal').should('not.exist');
  });
});
