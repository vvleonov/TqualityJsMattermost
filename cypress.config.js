const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/tests/**/*.cy.{js,jsx,ts,tsx}",
    fixturesFolder: "cypress/resources/fixtures",
    baseUrl: "http://localhost:8065",
    defaultCommandTimeout: 10000,
    trashAssetsBeforeRuns: true,
    video: true
  },
});