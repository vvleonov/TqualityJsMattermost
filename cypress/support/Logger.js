export default class Logger {
    static step(message) {
        return cy.log(`[STEP] ${message}`);
    }

    static info(message) {
        return cy.log(`[INFO] ${message}`);
    }

    static debug(message) {
        return cy.log(`[DEBUG] ${message}`);
    }

    static error(message) {
        return cy.log(`[ERROR] ${message}`);
    }

    static assertion(message) {
        return cy.log(`[ASSERTION] ${message}`);
    }
}