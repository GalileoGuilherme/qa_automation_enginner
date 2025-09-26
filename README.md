# QA Automation Engineer - Cypress Suite

Este projeto contém uma suíte completa de testes automatizados para aplicações web e APIs, utilizando o Cypress, Mochawesome e outras ferramentas modernas do ecossistema JavaScript para garantir qualidade em pipelines, integrações contínuas e entregas confiáveis.

## 🚀 Começando

Siga estes passos para clonar e executar o projeto na sua máquina local para desenvolvimento, execução dos testes e geração dos relatórios.

## 📋 Pré-requisitos

- Node.js v16 ou superior
- npm (preferencialmente versão 7+)
- Git

## 🔧 Instalação

Para instalar e preparar o ambiente:

 - git clone https://github.com/GalileoGuilherme/qa_automation_enginner.git
 - cd qa_automation_engineer
 - npm install

## ⚙️ Executando os testes

Há scripts prontos para rodar os testes de maneira manual e automatizada:

- Para executar todos os testes (incluindo frontend e API):

 - npm run test:all


Esse comando vai executar todos os specs, gerar os relatórios .json e logo em seguida consolidar e gerar o relatório HTML final.

- Para gerar apenas o relatório (se já houver testes executados):

npm run report

- Para rodar somente os testes de API:

npm run test:api

- Para rodar somente os testes de frontend:

npm run test:frontend

Os relatórios ficam salvos na pasta `mochawesome-report/` e podem ser abertos em qualquer navegador. Exemplo: `mochawesome-report/mochawesome.html`.

## 📂 Estrutura do Projeto

- `/e2e/api`: testes automatizados de API
- `/e2e/frontend`: testes automatizados da interface web
- `/fixtures`: arquivos de dados mockados, imagens, etc
- `/support`: comandos customizados e variáveis globais
- `/mochawesome-report`: pasta dos relatórios gerados
- `cypress.config.js`: configurações do Cypress e reporters
- `.github/workflows/cypress.yml`: configuração da integração contínua via GitHub Actions

## 🧩 Ferramentas e Dependências

Principais bibliotecas utilizadas:

- [Cypress](https://www.cypress.io/) ^15.3.0
- [Mochawesome](https://www.npmjs.com/package/mochawesome) ^7.1.4
- [cypress-multi-reporters](https://www.npmjs.com/package/cypress-multi-reporters) ^2.0.5
- [cypress-plugin-api](https://www.npmjs.com/package/cypress-plugin-api) ^2.11.2
- [mochawesome-merge](https://www.npmjs.com/package/mochawesome-merge) ^5.0.0
- [mochawesome-report-generator](https://www.npmjs.com/package/mochawesome-report-generator) ^6.3.0
- [@faker-js/faker](https://www.npmjs.com/package/@faker-js/faker) ^9.9.0
- [dotenv](https://www.npmjs.com/package/dotenv) ^17.2.2

## 📌 Integração Contínua - GitHub Actions

O projeto possui pipeline de CI configurada para rodar automaticamente em commits nas branches `main` e `dev`. A configuração do workflow está em `.github/workflows/cypress.yml`.

O workflow executa:

- Checkout do código
- Instalação das dependências via `npm ci`
- Execução dos testes com `npm run test:all`
- Upload do relatório mochawesome como artefato para análise

## ✒️ Autor

- **Galileo Guilherme** - *QA Engineer | Test Automation (Cypress, Playwright, Postman, Selenium) | API & Web Testing | Agile | iGaming | DevOps Mindset* - [Linkedin](https://www.linkedin.com/in/galileo-guilherme-01996693/)

## 📄 Licença

Este projeto está sob licença MIT.

## 🎁 Agradecimentos & Comunidade

- Compartilhe este projeto 📢
- Indique para colegas desenvolvedores e QAs 🧑‍💻
- Contribua, abra PRs e issues sempre que quiser colaborar!

---

⌨️ Desenvolvido usando Cypress por Galileo Guilherme!
