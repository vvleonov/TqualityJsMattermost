import Logger from "../support/Logger";

export default class BaseElement {
    /**
     * [Базовый класс для элементов]
     * @param {string} locator 
     * @param {string} name 
     */

    _locator;
    _name;
    
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

    click() {
        Logger.info(`Нажимаем на '${this._name}'`);
        this._getElement().click();
    }

    scrollTo(position) {
        this._getElement().scrollTo(position);
        return this;
    }

    getAttribute(attrName) {
        return this._getElement().invoke("attr", attrName);
    }

    isVisible() {
        return this._getElement().then((el) => {
            Cypress.dom.isVisible(el);
        });
    }

    _getElement() {
        return cy.get(this._locator);
    }
}