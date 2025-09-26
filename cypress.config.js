const { defineConfig } = require('cypress');
require('dotenv').config();

module.exports = defineConfig({
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json'
  },
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'https://default-url-se-nenhum-secret-for-configurado',
    supportFile: 'cypress/support/commands.js',
  },
});
