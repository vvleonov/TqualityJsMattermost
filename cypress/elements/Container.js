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
        return this.getElement().invoke("text");
    }

    findChildByLocator(locator) {
        return this.getElement().find(locator);
    }

    findChildByText(text) {
        return this.getElement().contains(text);
    }
}