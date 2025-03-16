import BaseElement from "../elements/BaseElement";

export default class Container extends BaseElement {
    /**
     * [Класс для контейнеров]
     * @param {string} locator 
     * @param {string} name 
     */
    constructor(locator, name) {
        super(locator, name);
    }

    getText() {
        return this._getElement().invoke("text");
    }

    getCount() {
        return this._getElement().then(elements => elements.length);
    }

    clickChild(locator) {
        this._findChildByLocator(locator).click();
    }

    clickChildByText(text) {
        this._findChildByText(text).click();
    }

    _findChildByLocator(locator) {
        return this._getElement().find(locator);
    }

    _findChildByText(text) {
        return this._getElement().contains(text);
    }
}