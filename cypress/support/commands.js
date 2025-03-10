Cypress.Commands.add("wrapAndAlias", (object, alias) => {
    cy.wrap(object).as(alias);
});

Cypress.Commands.add("getByAlias", alias => {
    cy.get(`@${alias}`);
});

Cypress.Commands.add("writeDownloadedFile", (fileName, body, encoding) => {
    cy.writeFile(`${Cypress.config("downloadsFolder")}/${fileName}`, body, encoding);
});

Cypress.Commands.add("getDownloadedFile", (fileName, encoding) => {
    cy.readFile(`${Cypress.config("downloadsFolder")}/${fileName}`, encoding = encoding);
});