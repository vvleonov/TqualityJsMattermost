import Logger from "../support/Logger";

export default class BaseElement {
    /**
     * [Базовый класс для элементов]
     * @param {string} locator 
     * @param {string} name 
     */
    constructor(locator, name) {
        this._locator = locator;
        this._name = name;
    }

    get locator() {
        return this._locator;
    }

    get name() {
        return this._name;
    }

    getElement() {
        return cy.get(this._locator);
    }

    click() {
        Logger.info(`Нажимаем на '${this._name}'`);
        this.getElement().click();
    }

    scrollTo(position) {
        this.getElement().scrollTo(position);
        return this;
    }

    getAttribute(attrName) {
        return this.getElement().invoke("attr", attrName);
    }

    isVisible() {
        return this.getElement().then((el) => {
            Cypress.dom.isVisible(el);
        });
    }
}