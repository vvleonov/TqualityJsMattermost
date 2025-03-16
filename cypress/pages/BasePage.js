export default class BasePage {
    /**
     * [Базовый класс для страниц]
     * @param {string} locator 
     * @param {string} name 
     */

    _locator;
    _name;

    constructor(locator, name) {
        this._locator = locator;
        this._name = name;
        cy.log(`Страница '${this.name}' создана`);
    }

    get locator() {
        return this._locator;
    }

    get name() {
        return this._name;
    }

    isOpened(){
        return cy.get("body").then(body => {
            if (body.find(this._locator).length > 0) {
                return Cypress.dom.isVisible(body.find(this._locator));
            } else {
                return false;
            }
        });
    }
}