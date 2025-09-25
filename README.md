# qa_automation_enginner

Testes API DemoQA com Cypress
Este projeto contém testes automatizados usando Cypress para validar o fluxo de criação de usuários, autenticação, autorização e aluguel de livros na API do DemoQA.

Fluxo coberto pelos testes
Criar usuário aleatório com senha segura

Gerar token de acesso para o usuário

Confirmar autorização do usuário

Listar livros disponíveis na livraria

Alugar dois livros para o usuário

Consultar detalhes do usuário garantindo livros alugados

Como rodar os testes
Requisitos
Node.js instalado

Cypress instalado nas dependências do projeto

Comandos principais
Abra interface interativa do Cypress:

npx cypress open

Executar todos os testes no modo headless:

npx cypress run

Estrutura dos comandos personalizados (cypress/support/commands.js)
api_createRandomUser - cria usuário aleatório com senha segura

api_generateToken - gera token JWT para autenticação

api_checkAuthorized - valida se o usuário está autorizado

api_listBooks - retorna a lista de livros disponíveis

api_rentBooks - aluga livros para o usuário

api_getUserDetails - consulta detalhes do usuário incluindo livros alugados

api_deleteUser - deleta o usuário criado (usado na limpeza dos testes)

Observações importantes
Existe um problema conhecido na API de autorização, onde algumas requisições indicam falta de autorização mesmo após retorno positivo no login.
Para lidar com isso, alguns testes possuem cy.log explicando essa limitação e adaptações nas validações.
O fluxo de criação e limpeza do usuário é feito com hooks para garantir testes independentes e ambiente limpo.

Melhorias futuras
Adicionar validações de esquema JSON completas

Integrar com pipelines CI/CD para execução automática

Implementar mocks/fixtures para casos mais isolados

Documentar melhor os comandos customizados